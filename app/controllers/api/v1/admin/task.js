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
          Tasks.findAll({
            include: [
              {
                model: Descriptions,
                as: "descriptions",
                attributes: ["id", "description"],
                through: {
                  attributes: [],
                },
              },
            ],
          }),
          // Descriptions.findAll(),
        ]);

        return res.http200({ tasks });
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

        await Tasks.insertTaskDescription(projectTask.name, descriptions);
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
