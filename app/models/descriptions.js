const { getSetMethods } = global.sequelizeFunctions;
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const { STRING, DECIMAL, INTEGER } = DataTypes;
  const Descriptions = sequelize.$$defineModel("descriptions", {
    description: {
      type: STRING,
      allowNull: false,
    },
  });

  /* ================== Model Associations ================== */
  Descriptions.associate = (models) => {
    Descriptions.belongsToMany(models.Tasks, {
      through: models.TaskDescription,
      foreignKey: "descriptionId",
      as: "tasks",
    });
  };

  return Descriptions;
};
