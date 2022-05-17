const activitiesCommonField = {
  date: {type: 'string'},
  employeeId: {type: 'number'},
  amount: {type: 'number'}
};
module.exports = {
  '/': {
    post: {
      body: {
        ...activitiesCommonField,
        allowableKeys: ['date', 'employeeId', 'amount'],
      },
    },
  },
  '/:id': {
    put: {
      body: {
        date: {...activitiesCommonField.date, isOptional: true},
        employeeId: {...activitiesCommonField.employeeId, isOptional: true},
        allowableKeys: ['date', 'employeeId', 'amount'],
      }
    }
  }
};
