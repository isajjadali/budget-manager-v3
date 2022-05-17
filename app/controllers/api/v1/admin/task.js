const { Tasks, Descriptions, Projects, ProjectTasks, ProjectTaskDescriptions } =
  global.db;
const { asyncMiddleware } = global;

module.exports = (router) => {
  // async function getTask(req, res, next) {
  //   const { name } = req.body;
  //   const tasks = await Tasks.findOrCreate({
  //     where: {
  //       name,
  //     },
  //   });

  //   return res.http200(tasks);
  // }
  // async function getTaskDescription(req, res, next) {
  //   const { description } = req.body;
  //   const descriptions = await Descriptions.findOrCreate({
  //     where: {
  //       description,
  //     },
  //   });
  //   return res.http200(descriptions);
  // }

  async function getProject(req, res, next) {
    const { projectId } = req.body;
    const project = await Projects.$$findByPk({ id: +projectId });
    req.project = project;
    next();
  }
  async function createTasks(req, res, next) {}
  router
    .route("/")
    .post(
      asyncMiddleware(getProject),
      asyncMiddleware(async (req, res, next) => {
        const tasks = await ProjectTasks.create({ ...req.body });
        const descriptions = await ProjectTaskDescriptions.$$bulkCreate(
          req.body.descriptions.map((item) => ({
            projectTaskId: tasks.id,
            ...item,
          }))
        );
        await Tasks.findOrCreate({
          where: {
            name: tasks.name,
          },
        });
        await descriptions.map((item) => {
          Descriptions.findOrCreate({
            where: {
              description: item.description,
            },
          });
        });
        return res.http200({ tasks: tasks, descriptions: descriptions });
      })
    )
    .get(
      asyncMiddleware(async (req, res) => {
        const list = await Tasks.findAll();
        const listDesc = await Descriptions.findAll();
        return res.http200({ tasks: list, descriptions: listDesc });
      })
    );
};
