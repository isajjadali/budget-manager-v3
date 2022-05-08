const {getSetMethods} = global.sequelizeFunctions;
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const {STRING, INTEGER} = DataTypes;
  const ProjectTaskDescriptions = sequelize.$$defineModel(
    'ProjectTaskDescriptions',
    {
      projectTaskId: {
        references: {
          key: 'id',
          model: 'project_tasks',
        },
        type: INTEGER,
      },
      description: {
        type: STRING,
      },
    }
  );

  /* ================== Model Associations ================== */
  ProjectTaskDescriptions.associate = (models) => {
    ProjectTaskDescriptions.belongsTo(models.ProjectTasks, {
      foreignKey: 'projectTaskId',
      as: models.ProjectTasks.$$singularName,
    });
  };

  return ProjectTaskDescriptions;
};
