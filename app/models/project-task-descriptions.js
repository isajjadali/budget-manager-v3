const { getSetMethods } = global.sequelizeFunctions;
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const { STRING, INTEGER, DECIMAL } = DataTypes;
  const ProjectTaskDescriptions = sequelize.$$defineModel(
    "ProjectTaskDescriptions",
    {
      projectTaskId: {
        references: {
          key: "id",
          model: "project_tasks",
        },
        type: INTEGER,
      },
      description: {
        type: STRING,
      },
      laborCost: {
        type: DECIMAL,
      },
    }
  );

  /* ================== Model Associations ================== */
  ProjectTaskDescriptions.associate = (models) => {
    ProjectTaskDescriptions.belongsTo(models.ProjectTasks, {
      foreignKey: "projectTaskId",
      as: models.ProjectTasks.$$singularName,
    });
  };

  return ProjectTaskDescriptions;
};
