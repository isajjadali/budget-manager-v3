const { getSetMethods } = global.sequelizeFunctions;
const moment = require("moment");
const { ProjectStatus } = require("../enums");

module.exports = function (sequelize, DataTypes) {
  const { STRING, VIRTUAL, DATEONLY, TEXT, BOOLEAN } = DataTypes;
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
    startDate: {
      type: DATEONLY,
    },
    expectedEndDate: {
      type: STRING,
    },
    endDate: {
      type: VIRTUAL,
      get: function () {
        return evalutateEndDate(this.expectedEndDate)
      }
    },

    feedback: {
      type: STRING
    },
    isDelayed: {
      type: BOOLEAN,
    }

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

  function evalutateEndDate(expectedEndDate) {
    const reEndDateFormat = /^\d*[D|W|M]$/g; // format like 1D, 1M, 1W
    const reNumberOnly = /^\d*/g; // Only extract Number from string

    if (!reEndDateFormat.test(expectedEndDate))
      return null;

    const count = reNumberOnly.exec(expectedEndDate)[0];

    return {
      count,
      unit: expectedEndDate.replace(reNumberOnly, '')
    }
  }
  return Projects;
};
