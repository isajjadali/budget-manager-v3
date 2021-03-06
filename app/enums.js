module.exports.Validations = {
  CNIC: {
    Format: 'XXXXX-XXXXXXX-X',
    Regex: /^\d{5}-\d{7}-\d{1}$/,
  },
  PhoneNumber: {
    Format: 'XX-XXXXXXXXXX',
    Regex: /^\d\d-\d{10}$/,
  },
};

module.exports.CRUD = {
  Created: 'created',
  Deleted: 'deleted',
  Read: 'read',
  Updated: 'updated',
};

module.exports.Statuses = {
  User: {
    Active: 'active',
    Inactive: 'inactive',
  },
};

module.exports.Roles = {
  Admin: 'ADMIN',
  Employee: 'EMPLOYEE',
};
module.exports.ProjectStatus = {
  Draft: 'DRAFT',
  PendingReview: 'PENDINGREVIEW',
  OnGoing: 'ONGOING',
  Completed: 'COMPLETED',
};

module.exports.ActivitiesType = {
  payin: 'PAYINS',
  labour: 'LABOUR',
  material: 'MATERIAL'
};