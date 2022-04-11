const { getSetMethods } = global.sequelizeFunctions;
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const { STRING, DECIMAL } = DataTypes;
    const Tasks = sequelize.$$defineModel('Tasks', {
        name: {
            type: STRING,
            ...getSetMethods.call(this, 'name', 'startCase'),
        },
        materialCost: {
            type: DECIMAL,
        },
        laborCost: {
            type: DECIMAL,
        },
    });

    /* ================== Model Associations ================== */
    Tasks.associate = (models) => {
        Tasks.hasMany(models.TaskDescriptions, {
            foreignKey: 'taskId',
            as: models.TaskDescriptions.$$name,
        });
    };

    return Tasks;
};
