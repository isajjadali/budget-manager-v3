const moment = require('moment');
const {startCase} = require('lodash');
const {getHashedPassword, createToken} = global.commonFunctions;
const {getSetMethods} = global.sequelizeFunctions;
const {Statuses, Roles, ActivitiesType} = global.appEnums;
const {Errors} = global.appTranslations;

module.exports = function (sequelize, DataTypes) {
  const {INTEGER, STRING, ENUM, DECIMAL, VIRTUAL} = DataTypes;
  let _models = {};
  const {Op} = sequelize.Sequelize;
  const Users = sequelize.$$defineModel(
    'Users',
    {
      firstName: {
        type: STRING,
        allowNull: false,
        ...getSetMethods.call(this, 'firstName'),
      },
      lastName: {
        type: STRING,
        allowNull: false,
        ...getSetMethods.call(this, 'lastName'),
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: Errors.Email.Unique,
        },
        validate: {
          isEmail: {
            msg: Errors.Email.Invalid,
          },
        },
      },
      password: {
        type: STRING,
        allowNull: false,
        $privateKey: true,
        set: function (value) {
          this.setDataValue('password', getHashedPassword(value));
        },
      },
      roles: {
        type: ENUM,
        allowNull: false,
        values: [Roles.Admin, Roles.Employee],
        ...getSetMethods.call(this, 'roles', 'upperCase'),
      },
      balance: {
        type: DECIMAL,
        defaultValue: 0,
        get() {
          return Number(this.getDataValue('balance'));
        }
      },
      rate: {
        type: INTEGER,
        defaultValue: 0,
      },
      status: {
        type: STRING,
        defaultValue: Statuses.User.Active,
        ...getSetMethods.call(this, 'status'),
      },
      address: {
        type: STRING,
      },
      /* ================== Virtual Keys ================== */
      fullName: {
        type: VIRTUAL,
        get: function () {
          return startCase(
            `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`
          );
        },
      },
      age: {
        type: VIRTUAL,
        get: function () {
          const dateOfBirth = this.getDataValue('dateOfBirth');
          if (!dateOfBirth) {
            return null;
          }
          return moment().diff(moment(dateOfBirth), 'years');
        },
      },
    },
    {
      validate: {},
    }
  );

  /* ================== Model Associations ================== */
  Users.associate = (models) => {
    _models = models;
    Users.hasMany(models.Activities, {
      foreignKey: 'employeeId',
      as: models.Activities.$$name,
    });
  };

  /* ================== Instance Methods ================== */
  Users.prototype.logActivity = async function _logActivity({
    amount = 0,
    dateId,
    ...rest
  } = {}) {
    const activities = await this.getActivities({
      where: {
        dateId,
      },
      include: [
        {
          model: global.db.Dates,
          as: global.db.Dates.$$singularName
        }
      ],
      limit: 1,
    });
    if (activities.length) {
      const error = new Error();
      error.message = `${this.fullName} already have an activity on the date ${activities[0].date.date}`;
      error.statusCode = 400;
      throw error;
    }
    const newActivity = {
      dateId,
      ...rest,
      amount: amount || this.rate,
      employeeId: this.id,
      isPaid: !!amount,
      type: ActivitiesType.labour
    };
    const savedActivity = await global.db.Activities.create(newActivity);
    await this.update({
      balance: Number(this.balance) + Number(this.rate) - amount,
    });
    return savedActivity;
  };
  Users.prototype.createToken = function (obj = {}) {
    return createToken({
      id: this.id,
      email: this.email,
      ...obj,
    });
  };

  /* ================== Class Methods ================== */
  Users.$$create = async function (body) {
    // const { roleIds } = body;
    // const user = await Users.create(body);
    // await _models.UserRoles.$$bulkCreate(
    //   roleIds.map((roleId) => ({ userId: user.id, roleId }))
    // );
    // user.dataValues.roles = await user.getRoles();
    // return user;
  };

  return Users;
};
