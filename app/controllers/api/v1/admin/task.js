const { Tasks, Descriptions, Projects, ProjectTasks, ProjectTaskDescriptions } =
  global.db;
const { asyncMiddleware } = global;

module.exports = (router) => {
  async function getProject(req, res, next) {
    const { projectId } = req.body;
    const project = await Projects.$$findByPk({ id: +projectId });
    req.project = project;
    next();
  }

  router.param(
    "taskId",
    asyncMiddleware(async (req, res, next, taskId) => {
      const projectTask = await ProjectTasks.$$findByPk({ id: +taskId });
      req.projectTask = projectTask;
      next();
    })
  );
  router
    .route("/")
    // This API is for suggestion.
    .get(
      asyncMiddleware(async (req, res) => {
        const [tasks, descriptions] = await Promise.all([
          Tasks.findAll(),
          Descriptions.findAll(),
        ]);

        return res.http200({ tasks, descriptions });
      })
    );
  router
    .route("/:taskId")
    .put(
      asyncMiddleware(async (req, res, next) => {
        const projectTask = await req.projectTask.update(req.body);
        await ProjectTaskDescriptions.destroy({
          where: {
            projectTaskId: req.projectTask.id,
          },
          paranoid: false,
        });
        const descriptions = await ProjectTaskDescriptions.$$bulkCreate(
          req.body.descriptions.map((item) => ({
            projectTaskId: req.projectTask.id,
            ...item,
          }))
        );

        res.http200({ ...projectTask.toJSON(), descriptions: descriptions });
        await Promise.all([
          Tasks.findOrCreate({
            where: {
              name: projectTask.name,
            },
          }),
          ...descriptions.map((item) => {
            Descriptions.findOrCreate({
              where: {
                description: item.description,
              },
            });
          }),
        ]);
        return;
      })
    )
    .delete(
      asyncMiddleware(async (req, res, next) => {
        await req.projectTask.destroy({ paranoid: false });
        return res.http200({ message: "Deleted task successfully." });
      })
    );
};
