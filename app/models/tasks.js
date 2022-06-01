const { getSetMethods } = global.sequelizeFunctions;
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const { STRING, DECIMAL, INTEGER } = DataTypes;
  const Tasks = sequelize.$$defineModel("tasks", {
    name: {
      type: STRING,
      allowNull: false,
    },
  });

  /* ================== Model Associations ================== */
  Tasks.associate = (models) => {
    Tasks.belongsToMany(models.Descriptions, {
      through: models.TaskDescription,
      foreignKey: "taskId",
      as: "descriptions",
    });
  };

  Tasks.insertTaskDescription = async (name, descriptions) => {
    const results = await Promise.all([
      Tasks.findOrCreate({
        where: {
          name: name,
        },
      }),
      ...descriptions.map((item) => {
        return global.db.Descriptions.findOrCreate({
          where: {
            description: item.description,
          },
        });
      }),
    ]);

    const [task, ...createdDescriptions] = results;
    return Promise.all(
      createdDescriptions.map(
        (item) =>
          new Promise((resolve, reject) => {
            global.db.TaskDescription.findOrCreate({
              where: {
                descriptionId: item[0].id,
                taskId: task[0].id,
              },
            })
              .then((res) => resolve(res))
              .catch((e) => reject(e));
          })
      )
    );
  };

  Tasks.inserProjectTaskDescription = async (tasks, projectId) => {
    return Promise.all(
      tasks &&
        tasks.map(async (item) => {
          const task = await global.db.ProjectTasks.create({
            ...item,
            projectId: projectId,
          });
          const descriptions =
            await global.db.ProjectTaskDescriptions.$$bulkCreate(
              item.descriptions &&
                item.descriptions.map((item) => ({
                  projectTaskId: task.id,
                  ...item,
                }))
            );
          Tasks.insertTaskDescription(task.name, descriptions);
          return { ...task.toJSON(), descriptions };
        })
    );
  };
  return Tasks;
};
