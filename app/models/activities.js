const {ActivitiesType} = require('../enums');
module.exports = function (sequelize, DataTypes) {
  const {INTEGER, DECIMAL, BOOLEAN, STRING, VIRTUAL} = DataTypes;
  const Activities = sequelize.$$defineModel(
    'Activities',
    {
      amount: {
        defaultValue: 0,
        type: DECIMAL,
        get() {
          return Number(this.getDataValue('amount'));
        }
      },
      dateId: {
        references: {
          field: 'id',
          model: 'dates',
        },
        type: INTEGER,
      },
      employeeId: {
        references: {
          key: 'id',
          model: 'users',
        },
        type: INTEGER,
      },
      isPaid: {
        defaultValue: false,
        type: BOOLEAN,
      },
      isPayin: {
        type: VIRTUAL,
        get() {
          return this.getDataValue('type') === ActivitiesType.payin;
        }
      },
      isMaterial: {
        type: VIRTUAL,
        get() {
          return this.getDataValue('type') === ActivitiesType.material;
        }
      },
      isLabour: {
        type: VIRTUAL,
        get() {
          return this.getDataValue('type') === ActivitiesType.labour;
        }
      },
      projectId: {
        references: {
          key: 'id',
          model: 'projects',
        },
        type: INTEGER,
      },
      type: {
        type: STRING,
        defaultValue: ActivitiesType.labour
      }
    },
    {
      paranoid: false,
    }
  );

  /* ================== Model Associations ================== */
  Activities.associate = (models) => {
    Activities.belongsTo(models.Projects, {
      foreignKey: 'projectId',
      as: models.Projects.$$singularName,
    });
    Activities.belongsTo(models.Users, {
      foreignKey: 'employeeId',
      as: 'employee',
    });
    Activities.belongsTo(models.Dates, {
      foreignKey: 'dateId',
      as: models.Dates.$$singularName,
    });
  };

  return Activities;
};
