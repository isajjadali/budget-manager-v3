module.exports = function (sequelize, DataTypes) {
    const { STRING, INTEGER } = DataTypes;
    const TaskDescriptions = sequelize.$$defineModel('TaskDescriptions', {
        taskId: {
            references: {
                key: 'id',
                model: 'tasks',
            },
            type: INTEGER,
        },
        description: {
            type: STRING,
        },
    });

    /* ================== Model Associations ================== */
    TaskDescriptions.associate = (models) => {
        TaskDescriptions.belongsTo(models.Tasks, {
            foreignKey: 'taskId',
            as: models.Tasks.$$singularName,
        });
    };

    return TaskDescriptions;
};
