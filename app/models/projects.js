const { getSetMethods } = global.sequelizeFunctions;
const moment = require("moment");
const { ProjectStatus } = require("../enums");

module.exports = function (sequelize, DataTypes) {
  const { STRING, DECIMAL, DATEONLY, TEXT } = DataTypes;
  const Projects = sequelize.$$defineModel("Projects", {
    name: {
      type: STRING,
      defaultValue: "Unnamed Project",
      ...getSetMethods.call(this, "name", "startCase"),
    },
    clientAddress: {
      type: STRING,
    },

    clientEmail: {
      type: STRING,
    },
    status: {
      type: STRING,
      defaultValue: ProjectStatus.Draft,
    },
  });

  /* ================== Model Associations ================== */
  Projects.associate = (models) => {
    Projects.hasMany(models.Activities, {
      foreignKey: "projectId",
      as: models.Activities.$$name,
    });
    Projects.hasMany(models.ProjectTasks, {
      foreignKey: "projectId",
      as: models.ProjectTasks.$$name,
    });
  };

  return Projects;
};
