module.exports = function (sequelize, DataTypes) {
  const { INTEGER } = DataTypes;
  const TaskDescription = sequelize.$$defineModel("TaskDescription", {
    taskId: {
      references: {
        key: "id",
        model: "tasks",
      },
      type: INTEGER,
    },
    descriptionId: {
      references: {
        key: "id",
        model: "descriptions",
      },
      type: INTEGER,
    },
  });
  return TaskDescription;
};
