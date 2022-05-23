const { getSetMethods } = global.sequelizeFunctions;
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const { STRING, DECIMAL, INTEGER } = DataTypes;
  const Descriptions = sequelize.define(
    "descriptions",
    {
      description: {
        type: STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
    },
    { timestamps: false, createdAt: false, updatedAt: false, paranoid: false }
  );

  /* ================== Model Associations ================== */
  Descriptions.associate = (models) => {};

  return Descriptions;
};
