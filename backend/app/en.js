const {
    Validations
} = global.appEnums;

module.exports.$translate = function (key, mappings) {
    Object
        .keys(mappings)
        .forEach(mapKey => key = key.replace(`$$${mapKey}`, mappings[mapKey]));
    return key;
};

module.exports.Errors = {
    Auth: {
        AuthorizationHeaderMissing: 'Authorization header missing!',
        InvalidToken: 'Invalid token!',
        UnSynchronized: 'User required details are not synchronized!'
    },
    CNIC: {
        Format: `CNIC format must be ${Validations.CNIC.Format}!`
    },
    Email: {
        Invalid: 'Invalid Email!',
        Unique: 'Email must be unique!'
    },
    Models: {
        InvalidId: 'Invalid $$modelName id!',
        NotFound: '$$modelName not found against this id!'
    },
    Password: {
        Validations: {
            IncorrectOldPassword: 'Incorrect old Password!',
            NewAndConfirmPasswordNotMatched: 'New password and confirm password do not match!',
            NewAndOldPasswordAreSame: 'New password and old password are same!'
        }
    },
    PhoneNumber: {
        Format: `Phone number format must be ${Validations.PhoneNumber.Format}!`
    },
    SignIn: {
        IncorrectEmailPassword: 'Invalid email or password!'
    }
};

module.exports.SuccessResponses = {
    CRUD: '$$modelName($$item) $$action successfully!',
    User: {
        Logout: 'User logout successfully!'
    }
};
