const EmployeeCommonField = {
  firstName: {type: 'string'},
  lastName: {type: 'string'},
  email: {type: 'string', isEmail: true},
  password: {type: 'string'},
};
module.exports = {
  '/': {
    post: {
      body: {
        ...EmployeeCommonField,
        allowableKeys: ['firstName', 'lastName', 'email', 'password', 'rate', 'address'],
      },
    },
  },
  '/:id': {
    put: {
      body: {
        firstName: {...EmployeeCommonField.firstName, isOptional: true},
        lastName: {...EmployeeCommonField.lastName, isOptional: true},
        email: {...EmployeeCommonField.email, isOptional: true},
        allowableKeys: ['firstName', 'lastName', 'email', 'password', 'rate', 'address'],
      }
    }
  }
};
