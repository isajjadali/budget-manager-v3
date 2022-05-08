module.exports = function (sequelize, DataTypes) {
  const {INTEGER, DECIMAL, BOOLEAN} = DataTypes;
  const Activities = sequelize.$$defineModel(
    'Activities',
    {
      amount: {
        defaultValue: 0,
        type: DECIMAL,
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
      projectId: {
        references: {
          key: 'id',
          model: 'projects',
        },
        type: INTEGER,
      },
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
