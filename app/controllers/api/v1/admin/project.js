const { asyncMiddleware } = global;
const findCreateDate = require(`${global.paths.middlewares}/find-create-date`);
const { sequelizeConfig } = require(`${global.paths.lib}/sequelize`);
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
        delete req.body.id;
        const project = await Projects.create(req.body);
        return res.http200(project);
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
        res.http200(req.project);
      })
    )
    .put(
      asyncMiddleware(async (req, res) => {
        delete req.body.id;
        const updatedProject = await req.project.update(req.body);
        return res.http200(updatedProject);
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
  router.route("/:projectId/task").post(
    asyncMiddleware(async (req, res, next) => {
      const task = await ProjectTasks.create({
        ...req.body,
        projectId: req.project.id,
      });
      const descriptions = await ProjectTaskDescriptions.$$bulkCreate(
        req.body.descriptions.map((item) => ({
          projectTaskId: task.id,
          ...item,
        }))
      );
      res.http200({ ...task.toJSON(), descriptions: descriptions });
      await Tasks.insertTaskDescription(task.name, descriptions);
      return;
    })
  );
};
