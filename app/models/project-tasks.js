const { getSetMethods } = global.sequelizeFunctions;
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const { STRING, DECIMAL, INTEGER } = DataTypes;
  const ProjectTasks = sequelize.$$defineModel(
    'ProjectTasks',
    {
      name: {
        type: STRING,
        ...getSetMethods.call(this, 'name', 'startCase'),
      },
      projectId: {
        references: {
          key: 'id',
          model: 'projects',
        },
        type: INTEGER,
      },
      materialCost: {
        type: DECIMAL,
        get() {
          return Number(this.getDataValue('materialCost'));
        }
      },
    },
    {
      paranoid: false,
    }
  );

  /* ================== Model Associations ================== */
  ProjectTasks.associate = (models) => {
    ProjectTasks.belongsTo(models.Projects, {
      foreignKey: 'projectId',
      as: models.Projects.$$singularName,
    });
    ProjectTasks.hasMany(models.ProjectTaskDescriptions, {
      foreignKey: 'projectTaskId',
      as: 'descriptions',
    });
  };

  return ProjectTasks;
};
