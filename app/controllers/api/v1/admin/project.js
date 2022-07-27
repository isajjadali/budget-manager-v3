const {
  ProjectStatus
} = global.appEnums;

const {
  sumBy,
  flatMap,
  map,
  filter
} = require("lodash");
const ReadableStream = require('stream').Readable;
const {
  asyncMiddleware
} = global;
const findCreateDate = require(`${global.paths.middlewares}/find-create-date`);
const moment = require('moment');
const {
  sequelizeConfig
} = require(`${global.paths.lib}/sequelize`);
const sendMail = require(`${global.paths.lib}/email-sender`);
const {
  ProjectPayins,
  Projects,
  Sequelize,
  Tasks,
  ProjectTasks,
  ProjectTaskDescriptions,
} = global.db;
const pdfConverter = require(`${global.paths.lib}/pdf-convertor`);

module.exports = (router) => {
  router
    .route("/")
    .get(
      asyncMiddleware(async (req, res) => {
        const query = {
          where: {},
          order: sequelizeConfig.Order.Desc(),
        };
        if (req.query.name) {
          query.where.name = {
            [Sequelize.Op.like]: `${req.query.name}%`,
          };
        }
        const projects = await Projects.findAll(query);
        return res.http200(projects);
      })
    )
    .post(
      asyncMiddleware(async (req, res) => {
        const project = await Projects.create(req.body);
        let tasks = [];
        if (req.body.tasks) {
          tasks = await Tasks.inserProjectTaskDescription(
            req.body.tasks,
            project.id
          );
        }
        return res.http200({
          ...project.toJSON(),
          tasks
        });
      })
    );

  router.param(
    "projectId",
    asyncMiddleware(async (req, res, next, projectId) => {
      const project = await Projects.$$findByPk({
        id: +projectId
      });
      req.project = project;
      next();
    })
  );

  async function getProjectWithTasks(req, res, next) {
    req.project.tasks = await req.project.getProjectTasks({
      include: [{
        model: ProjectTaskDescriptions,
        as: 'descriptions',
      }]
    })
    next()
  }

  router
    .route("/:projectId")
    .get(
      asyncMiddleware(async (req, res) => {
        const [activities, tasks] = await Promise.all([
          req.project.getActivities(),
          req.project.getProjectTasks({
            include: [{
              model: ProjectTaskDescriptions,
              as: 'descriptions',
            },],
          }),
        ]);
        const materialCost = sumBy(tasks, "materialCost");
        const laborCost = sumBy(
          flatMap(map(tasks, (p) => p.descriptions)),
          "laborCost"
        );
        const allPayins = activities.filter(activity => {
          if (activity.amount && activity.isPayin) {
            return activity.amount
          }
        });
        const allMaterialPayouts = activities.filter(activity => {
          if (activity.amount && activity.isMaterial) {
            return activity.amount
          }
        });
        const allLabourPayouts = activities.filter(activity => {
          if (activity.amount && activity.isLabour) {
            return activity.amount
          }
        });
        const projectMaterialSpending = sumBy(allMaterialPayouts, "amount");
        const projectLabourSpending = sumBy(allLabourPayouts, "amount");
        const projectAmountRecieved = sumBy(allPayins, "amount");

        res.http200({
          ...req.project.toJSON(),
          tasks,
          totalMaterialCost: materialCost,
          totalLaborCost: laborCost,
          projectCost: materialCost + laborCost,
          projectLabourSpending,
          projectAmountRecieved,
          projectMaterialSpending,
        });
      })
    )
    .put(
      asyncMiddleware(async (req, res) => {
        const updatedProject = await req.project.update(req.body);
        await ProjectTasks.destroy({
          where: {
            projectId: updatedProject.id,
          },
          paranoid: false,
        });
        let tasks = [];
        if (req.body.tasks) {
          tasks = await Tasks.inserProjectTaskDescription(
            req.body.tasks,
            updatedProject.id
          );
        }

        return res.http200({
          ...updatedProject.toJSON(),
          tasks
        });
      })
    )
    .delete(
      asyncMiddleware(async (req, res) => {
        await req.project.destroy();
        return res.http200({
          message: "Deleted project successfully",
        });
      })
    );

  router.post(
    "/:projectId/payins",
    asyncMiddleware(findCreateDate()),
    asyncMiddleware(async (req, res) => {
      const {
        amount
      } = req.body;
      const newPayIn = await ProjectPayins.create({
        amount,
        projectId: req.project.id,
        dateId: req.date.id,
      });
      res.status(200).send(newPayIn);
    })
  );

  router
    .route("/:projectId/preview")
    .get(
      asyncMiddleware(getProjectWithTasks),
      asyncMiddleware(async (req, res) => {
        const pdfBuffer = await pdfConverter("qoutation", {
          project: req.project
        });
        res.setHeader('Content-Type', 'application/pdf');
        const pdfStream = new ReadableStream();
        pdfStream.push(pdfBuffer);
        pdfStream.push(null);

        pdfStream.pipe(res);
      })
    );

  router
    .post("/:projectId/send-invoice",
      asyncMiddleware(getProjectWithTasks),
      asyncMiddleware(async (req, res, next) => {
        const status = req.project.status;
        if (status != ProjectStatus.Draft) {
          return res.http200("Invoice already sent to client");
        }
        const clientEmail = req.body.clientEmail || req.project.clientEmail;
        const clientAddress = req.body.clientAddress || req.project.clientAddress;
        const invoiceNotes = req.body.invoiceNotes;
        const expectedEndDate = req.body.expectedEndDate;

        let totalCost = 0
        req.project && req.project.tasks.length && req.project.tasks.forEach((task) => {
          totalCost = totalCost + task.materialCost + sumBy(task.descriptions, "laborCost");
        }, {});
        req.project.totalCost = totalCost;
        const pdf = await pdfConverter("qoutation", {
          project: Object.assign(req.project, { clientAddress, clientEmail, invoiceNotes, expectedEndDate })
        });
        
        const info = await sendMail("common-email-format", {
          to: clientEmail,
          subject: "Project invoice",
          attachments: [{
            filename: 'qoutation.pdf',
            content: Buffer.from(pdf, 'utf-8')
          }],
          variables: {
            userName: "Hi there!",
            email_content: 'Please find the attachment below.'
          },
        })
        await req.project.update({
          status: ProjectStatus.PendingReview,
          clientEmail,
          clientAddress,
          invoiceNotes,
          expectedEndDate,
        })
        res.http200("Mail sent successfully!");

      })
    )

  router.post("/:projectId/start",
    asyncMiddleware(async (req, res, next) => {
      let body = {
        expectedEndDate: req.body.expectedEndDate,
        startDate: moment().format('YYYY-MM-DD'),
        status: ProjectStatus.OnGoing
      }
      debugger;
      await req.project.update(body);
      res.http200("Project Start!");
    }))

  router.post("/:projectId/complete",
    asyncMiddleware(async (req, res, next) => {
      let body = {
        status: ProjectStatus.Completed,
        feedback: req.body.feedback
      }
      await req.project.update(body);
      res.http200("Project Completed!");
    }))
};

