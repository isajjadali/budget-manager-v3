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
  router
    .route("/")
    .post(
      asyncMiddleware(getProject),
      asyncMiddleware(async (req, res, next) => {
        const task = await ProjectTasks.create({ ...req.body });
        const descriptions = await ProjectTaskDescriptions.$$bulkCreate(
          req.body.descriptions.map((item) => ({
            projectTaskId: task.id,
            ...item,
          }))
        );
        res.http200({ task: task, descriptions: descriptions });
        await Promise.all([
          Tasks.findOrCreate({
            where: {
              name: task.name,
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
    // This API is for suggestion.
    .get(
      asyncMiddleware(async (req, res) => {
        const list = await Tasks.findAll();
        const listDesc = await Descriptions.findAll();
        return res.http200({ tasks: list, descriptions: listDesc });
      })
    );
};
