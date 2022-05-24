const { getSetMethods } = global.sequelizeFunctions;
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const { STRING, DECIMAL, INTEGER } = DataTypes;
  const Tasks = sequelize.$$defineModel(
    "tasks",
    {
      name: {
        type: STRING,
        // primaryKey: true,
        // unique: true,
        allowNull: false,
      },
    }
    // { timestamps: false, createdAt: false, updatedAt: false, paranoid: false }
  );

  /* ================== Model Associations ================== */
  Tasks.associate = (models) => {
    Tasks.belongsToMany(models.Descriptions, {
      through: models.TaskDescription,
      foreignKey: "taskId",
      as: "descriptions",
    });
  };

  Tasks.insertTaskDescription = async (name, descriptions) => {
    const results = await Promise.all([
      Tasks.findOrCreate({
        where: {
          name: name,
        },
      }),
      ...descriptions.map((item) => {
        return global.db.Descriptions.findOrCreate({
          where: {
            description: item.description,
          },
        });
      }),
    ]);

    const [task, ...createdDescriptions] = results;
    console.log(
      ...createdDescriptions.map((description) => {
        return {
          descriptionId: description[0].id,
          taskId: task[0].id,
        };
      })
    );
    return global.db.TaskDescription.$$bulkCreate([
      ...createdDescriptions.map((description) => {
        return {
          descriptionId: description[0].id,
          taskId: task[0].id,
        };
      }),
    ]);
  };
  return Tasks;
};
