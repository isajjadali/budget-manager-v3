const {getSetMethods} = global.sequelizeFunctions;
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const {STRING, DECIMAL, DATEONLY, TEXT} = DataTypes;
  const Projects = sequelize.$$defineModel('Projects', {
    name: {
      type: STRING,
      defaultValue: 'Unnamed Project',
      ...getSetMethods.call(this, 'name', 'startCase'),
    },
    startDate: {
      type: DATEONLY,
      defaultValue: moment().format('YYYY-MM-DD'),
    },
    endDate: {
      type: DATEONLY,
      defaultValue: null,
    },
    amount: {
      type: DECIMAL,
    },
    notes: {
      type: TEXT,
      defaultValue: '',
    },
  });

  /* ================== Model Associations ================== */
  Projects.associate = (models) => {
    Projects.hasMany(models.Activities, {
      foreignKey: 'projectId',
      as: models.Activities.$$name,
    });
    Projects.hasMany(models.ProjectTasks, {
      foreignKey: 'projectId',
      as: models.ProjectTasks.$$name,
    });
  };

  return Projects;
};
