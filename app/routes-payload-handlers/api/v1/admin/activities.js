const activitiesCommonField = {
  date: {type: 'string'},
  employeeId: {type: 'number'},
  projectId: {type: 'number'},
  amount: {type:'number', isOptional: true },
};
module.exports = {
  '/': {
    post: {
      body: {
        ...activitiesCommonField,
        allowableKeys: ['date', 'employeeId', 'projectId', 'amount'],
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
        allowableKeys: ['date', 'employeeId', 'projectId', 'amount'],
      }
    }
  }
};
