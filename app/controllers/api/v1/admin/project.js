const { ProjectStatus } = global.appEnums;
const moment = require('moment');
const { sumBy, flatMap, map, filter } = require("lodash");
const { asyncMiddleware } = global;
const findCreateDate = require(`${global.paths.middlewares}/find-create-date`);
const { sequelizeConfig } = require(`${global.paths.lib}/sequelize`);
const sendMail = require(`${global.paths.lib}/email-sender`);
const {
  ProjectPayins,
  Projects,
  Sequelize,
  Tasks,
  ProjectTasks,
  ProjectTaskDescriptions,
} = global.db;

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
        return res.http200({ ...project.toJSON(), tasks });
      })
    );

  router.param(
    "projectId",
    asyncMiddleware(async (req, res, next, projectId) => {
      const project = await Projects.$$findByPk({ id: +projectId });
      req.project = project;
      next();
    })
  );

  router
    .route("/:projectId")
    .get(
      asyncMiddleware(async (req, res) => {
        const [activities, tasks] = await Promise.all([
          req.project.getActivities(),
          req.project.getProjectTasks({
            include: [
              {
                model: ProjectTaskDescriptions,
                as: 'descriptions',
              },
            ],
          }),
        ]);
        const materialCost = sumBy(tasks, "materialCost");
        const laborCost = sumBy(
          flatMap(map(tasks, (p) => p.ProjectTaskDescriptions)),
          "laborCost"
        );
        const allPayins = filter(activities, { amount: true });
        const allPayout = filter(activities, { amount: false });
        const projectLabourSpending = sumBy(allPayout, "amount");
        const projectAmountRecieved = sumBy(allPayins, "amount");

        res.http200({
          ...req.project.toJSON(),
          tasks,
          totalMaterialCost: materialCost,
          totalLaborCost: laborCost,
          projectCost: materialCost + laborCost,
          projectLabourSpending,
          projectAmountRecieved,
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

        return res.http200({ ...updatedProject.toJSON(), tasks });
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
      const { amount } = req.body;
      const newPayIn = await ProjectPayins.create({
        amount,
        projectId: req.project.id,
        dateId: req.date.id,
      });
      res.status(200).send(newPayIn);
    })
  );
  router
    .post("/:projectId/send-invoice",
      asyncMiddleware(async (req, res, next) => {
        const status = req.project.status;
        if (status != ProjectStatus.Draft) {
          return res.http200("Invoice already sent to client");
        }

        sendMail("common-email-format", {
          to: req.project.clientEmail,
          subject: "Project invoice",
          attachments: [{
          }],
          variables: {
            userName: "Hi there!",
            email_content: 'Please find the attachment below.'
          },
        }).then(info => {
          req.project.update({ status: ProjectStatus.PendingReview })
          res.http200("Mail sent successfully!");
        }).catch(error => {
          res.http400(error);
        })
      })
    )

  router.post("/:projectId/start",
    asyncMiddleware(async (req, res, next) => {
      let body = {
        startDate: moment().format('YYYY-MM-DD'),
        status: ProjectStatus.OnGoing
      }
      await req.project.update(body);
      res.http200("Project Start!");
    }))

  router.post("/:projectId/complete",
    asyncMiddleware(async (req, res, next) => {
      let body = {
        endDate: moment().format('YYYY-MM-DD'),
        status: ProjectStatus.Completed,
        feedback: req.body.feedback
      }
      await req.project.update(body);
      res.http200("Project Completed!");
    }))
};
