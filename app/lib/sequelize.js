const _ = require('lodash');

function _addSnakeCaseFields(fields) {
  Object.keys(fields).forEach(key => {
    fields[key].field = _.snakeCase(key);
  });
}

function _addConstraintOnFK(fields) {
  Object.keys(fields).forEach(key => {
    if (fields[key].references) {
      fields[key] = {
        ...fields[key],
        onUpdate: 'cascade',
        onDelete: 'cascade',
      };
    }
  });
}

function getFields(DataTypes, fields) {
  const { INTEGER, DATE } = DataTypes;
  _addConstraintOnFK(fields);
  _addSnakeCaseFields(fields);
  return {
    id: {
      field: 'id',
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DATE,
      field: 'updated_at',
    },
    deletedAt: {
      type: DATE,
      field: 'deleted_at',
    },
    ...fields,
  };
}

function getDefaultFields(DataTypes, fields) {
  const { NOW } = DataTypes;
  const defaultFields = getFields(DataTypes, fields);

  return {
    id: {
      ...defaultFields.id,
    },
    createdAt: {
      ...defaultFields.createdAt,
      defaultValue: NOW,
    },
    updatedAt: {
      ...defaultFields.updatedAt,
      defaultValue: NOW,
    },
    deletedAt: {
      ...defaultFields.deletedAt,
      defaultValue: null,
    },
    ...fields,
  };
}

function getSetMethods(field, getMethod = 'startCase') {
  return {
    get: function () {
      return _[getMethod](this.getDataValue(field));
    },
    set: function (value = '') {
      this.setDataValue(field, value.toLowerCase());
    },
  };
}

const sequelizeConfig = Object.freeze({
  Order: {
    Desc: (field = 'createdAt') => [[field, 'DESC']],
  },
});

module.exports = {
  sequelizeConfig,
  getDefaultFields,
  getFields,
  getSetMethods,
};
