const moment = require('moment');
const {upperCase} = require('lodash');

module.exports = function (sequelize, DataTypes) {
    const { DATEONLY, VIRTUAL } = DataTypes;
    const Dates = sequelize.$$defineModel(
        'Dates',
        {
            date: {
                type: DATEONLY,
                defaultValue: moment().format('YYYY-MM-DD'),
            },
            /* ================== Virtual Keys ================== */
            year: {
                type: VIRTUAL,
                get: function _getActivity() {
                    return moment(this.getDataValue('date')).format('YYYY');
                },
            },
            month: {
                type: VIRTUAL,
                get: function _getMonth() {
                    return moment(this.getDataValue('date')).format('YYYY-MM');
                },
            },
            week: {
                type: VIRTUAL,
                get: function _getWeek() {
                    return moment(this.getDataValue('date')).weeks();
                },
            },
        },
        {
            paranoid: false,
        }
    );

    /* ================== Model Associations ================== */
    Dates.associate = (models) => {
        Dates.hasMany(models.Activities, {
            foreignKey: 'dateId',
            as: models.Activities.$$name,
        });
    };

    /* ================== Instance Methods ================== */
    Dates.findCreate = function _findCreate(date) {
        return new Promise((resolve) => {
            Dates.findOrCreate({
                where: {
                    date,
                },
                defaults: {
                    date,
                },
            }).spread((newDate) => resolve(newDate));
        });
    };
    Dates.getResultsOf = async function _getResultsOf({ include, filters }) {
        const { from, to, orderBy, limit, offset } = filters;
        const query = {
            limit,
            offset,
            include,
            where: {},
            order: [['date', upperCase(orderBy) || 'DESC']],
        };

        if (from && to) {
            query.where.date = {
                [global.db.Sequelize.Op.between]: [from, to],
            };
        }
        return Dates.findAll(query);
    };

    return Dates;
};
