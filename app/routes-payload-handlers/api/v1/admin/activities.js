const activitiesCommonField = {
  date: {type: 'string'},
  employeeId: {type: 'number', isOptional: true},
  projectId: {type: 'number'},
  amount: {type: 'number', isOptional: true},
  type: {type: 'string'},
};
module.exports = {
  '/': {
    post: {
      body: {
        ...activitiesCommonField,
        allowableKeys: ['date', 'employeeId', 'projectId', 'amount', 'type'],

      },
    },
  },
  '/:id': {
    put: {
      body: {
        date: {...activitiesCommonField.date, isOptional: true},
        employeeId: {...activitiesCommonField.employeeId, isOptional: true},
        projectId: {...activitiesCommonField.projectId, isOptional: true},
        amount: {...activitiesCommonField.amount},
        allowableKeys: ['date', 'employeeId', 'projectId', 'amount', 'type'],

      }
    }
  }
};
