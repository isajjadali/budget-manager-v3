const {
  sumBy,
  flatMap,
  map,
  filter
} = require("lodash");
const {
  asyncMiddleware
} = global;
const findCreateDate = require(`${global.paths.middlewares}/find-create-date`);
const {
  sequelizeConfig
} = require(`${global.paths.lib}/sequelize`);
const {
  ExpenseItems,
  Expenses,
  ProjectPayins,
  Projects,
  Sequelize,
  UserProjectPayouts,
  Tasks,
  Descriptions,
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


  const path = require("path")
  var templatePath = path.resolve(path.join(global.appRoot, '/templates/qoutation.ejs'));
  let ejs = require('ejs');
  console.log(templatePath)
  var fs = require('fs');
  var pdf = require('html-pdf');
  var inlineCss = require('inline-css');
  const constants = require("../../../../templates/constants")

  // var srcURL = global.appRoot.replace("\app", "");
  const absoultPath = path.resolve(path.join(global.appRoot, ''));
  var options = {
    format: 'A4',
    // base: `file://${absoultPath}/`,
    "header": {
      "height": "45mm",
      // "contents": {
      //   default: `<img src="${constants.header}" style="width:100%;height:100%" alt = "" > `
      // }
      // "contents": `Testing Testing`
    },
    "footer": {
      "height": "45mm",
      // "contents": {
      //   default: `<img src="${constants.footer}" style="width:100%;height:100%" alt = "" > `
      // }
    },
    "orientation": "portrait", // portrait or landscape 
    "zoomFactor": "1", // default is 1 
    "type": "pdf", // allowed file types: png, jpeg, pdf 
    "quality": "75",
  }
  var inlineOption = {
    applyStyleTags: true,
    url: templatePath
  };

  router
    .route("/generate-pdf")
    .get(
      asyncMiddleware(async (req, res) => {
        ejs.renderFile(templatePath, {
          project: {
            name: "Testing Project",
            projectLogo: constants.logo,
            header: constants.header,
            footer: constants.footer,
            "tasks": [{
                "name": "Task 1",
                "materialCost": 2000,
                "id": 1,
                "createdAt": "2022-06-03T14:52:59.000Z",
                "updatedAt": "2022-06-03T14:52:59.000Z",
                "deletedAt": null,
                "projectId": 1,
                "descriptions": [{
                    "laborCost": 400,
                    "id": 1,
                    "createdAt": "2022-06-03T14:52:59.000Z",
                    "updatedAt": "2022-06-03T14:52:59.000Z",
                    "deletedAt": null,
                    "projectTaskId": 1,
                    "description": "desc-1"
                  },
                  {
                    "laborCost": 700,
                    "id": 2,
                    "createdAt": "2022-06-03T14:52:59.000Z",
                    "updatedAt": "2022-06-03T14:52:59.000Z",
                    "deletedAt": null,
                    "projectTaskId": 1,
                    "description": "desc-2"
                  },
                  {
                    "laborCost": 300,
                    "id": 3,
                    "createdAt": "2022-06-03T14:52:59.000Z",
                    "updatedAt": "2022-06-03T14:52:59.000Z",
                    "deletedAt": null,
                    "projectTaskId": 1,
                    "description": "desc-3"
                  }
                ]
              },
              {
                "name": "Task 1",
                "materialCost": 2000,
                "id": 1,
                "createdAt": "2022-06-03T14:52:59.000Z",
                "updatedAt": "2022-06-03T14:52:59.000Z",
                "deletedAt": null,
                "projectId": 1,
                "descriptions": [{
                    "laborCost": 400,
                    "id": 1,
                    "createdAt": "2022-06-03T14:52:59.000Z",
                    "updatedAt": "2022-06-03T14:52:59.000Z",
                    "deletedAt": null,
                    "projectTaskId": 1,
                    "description": "desc-1"
                  },
                  {
                    "laborCost": 700,
                    "id": 2,
                    "createdAt": "2022-06-03T14:52:59.000Z",
                    "updatedAt": "2022-06-03T14:52:59.000Z",
                    "deletedAt": null,
                    "projectTaskId": 1,
                    "description": "desc-2"
                  },
                  {
                    "laborCost": 300,
                    "id": 3,
                    "createdAt": "2022-06-03T14:52:59.000Z",
                    "updatedAt": "2022-06-03T14:52:59.000Z",
                    "deletedAt": null,
                    "projectTaskId": 1,
                    "description": "desc-3"
                  }
                ]
              },
              {
                "name": "Task 1",
                "materialCost": 2000,
                "id": 1,
                "createdAt": "2022-06-03T14:52:59.000Z",
                "updatedAt": "2022-06-03T14:52:59.000Z",
                "deletedAt": null,
                "projectId": 1,
                "descriptions": [{
                    "laborCost": 400,
                    "id": 1,
                    "createdAt": "2022-06-03T14:52:59.000Z",
                    "updatedAt": "2022-06-03T14:52:59.000Z",
                    "deletedAt": null,
                    "projectTaskId": 1,
                    "description": "desc-1"
                  },
                  {
                    "laborCost": 700,
                    "id": 2,
                    "createdAt": "2022-06-03T14:52:59.000Z",
                    "updatedAt": "2022-06-03T14:52:59.000Z",
                    "deletedAt": null,
                    "projectTaskId": 1,
                    "description": "desc-2"
                  },
                  {
                    "laborCost": 300,
                    "id": 3,
                    "createdAt": "2022-06-03T14:52:59.000Z",
                    "updatedAt": "2022-06-03T14:52:59.000Z",
                    "deletedAt": null,
                    "projectTaskId": 1,
                    "description": "desc-3"
                  }
                ]
              }
            ]
          }
        }, function (err, response) {
          if (err) return console.log(err);
          console.log("response", response);
          inlineCss(response, inlineOption)
            .then(function (htmlRes) {
              console.log(htmlRes)
              pdf.create(htmlRes, options).toFile('./businesscard2.pdf', function (err, response) {
                if (err) return console.log(err);
                console.log("response", response);
                res.status(200).send(response); // { filename: '/app/businesscard.pdf' }
              });

            })
        })
      })
      // var html = fs.readFileSync(templatePath, 'utf8');
    );

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
            }, ],
          }),
        ]);
        const materialCost = sumBy(tasks, "materialCost");
        const laborCost = sumBy(
          flatMap(map(tasks, (p) => p.ProjectTaskDescriptions)),
          "laborCost"
        );
        const allPayins = filter(activities, {
          amount: true
        });
        const allPayout = filter(activities, {
          amount: false
        });
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
};