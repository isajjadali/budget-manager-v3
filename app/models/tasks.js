const { getSetMethods } = global.sequelizeFunctions;
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const { STRING, DECIMAL, INTEGER } = DataTypes;
  const Tasks = sequelize.define(
    "tasks",
    {
      name: {
        type: STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
    },
    { timestamps: false, createdAt: false, updatedAt: false, paranoid: false }
  );

  /* ================== Model Associations ================== */
  Tasks.associate = (models) => {};

  Tasks.insertTaskDescription = async (name, descriptions) => {
    return Promise.all([
      Tasks.findOrCreate({
        where: {
          name: name,
        },
      }),
      ...descriptions.map((item) => {
        global.db.Descriptions.findOrCreate({
          where: {
            description: item.description,
          },
        });
      }),
    ]);
  };
  return Tasks;
};
