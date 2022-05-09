const {getSetMethods} = global.sequelizeFunctions;

module.exports = function (sequelize, DataTypes) {
  const {STRING, DECIMAL} = DataTypes;
  const TaskDescriptions = sequelize.$$defineModel('TaskDescriptions', {
    materialCost: {
      type: DECIMAL,
    },
    laborCost: {
      type: DECIMAL,
    },
    description: {
      type: STRING,
    },
  });

  /* ================== Model Associations ================== */
  TaskDescriptions.associate = (models) => {
  };

  return TaskDescriptions;
};
