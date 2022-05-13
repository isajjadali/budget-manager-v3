const activitiesCommonField = {
  date: {type: 'string'},
  employeeId: {type: 'number'},
  amount: {type: 'number'},
  projectId: {type: 'number', isOptional: true},
};
module.exports = {
  '/': {
    post: {
      body: {
        ...activitiesCommonField,
        allowableKeys: ['date', 'employeeId', 'amount', 'projectId'],
      },
    },
  },
  '/:id': {
    put: {
      body: {
        date: {...activitiesCommonField.date, isOptional: true},
        employeeId: {...activitiesCommonField.employeeId, isOptional: true},
        projectId: {...activitiesCommonField.projectId},
        allowableKeys: ['date', 'employeeId', 'amount', 'projectId'],
      }
    }
  }
};
