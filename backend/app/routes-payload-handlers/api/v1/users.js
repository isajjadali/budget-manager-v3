const UserCommonRequiredKeys = {
    cityId: { type: 'number' },
    email: { type: 'string', isEmail: true },
    password: { type: 'string', minLength: 8 },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    address: { type: 'string' },
    phoneNumber: { type: 'string' },
    cnic: { type: 'string' },
    roleIds: { type: [], avoidEmptyArray: true },
    allowableKeys: ['cityId', 'email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'cnic'],
};

module.exports = {
    'sign-up': {
        post: {
            body: { ...UserCommonRequiredKeys },
        },
    },
    'sign-in': {
        post: {
            body: {
                email: { type: 'string', isEmail: true },
                password: { type: 'string' },
                deviceType: { type: 'string', isOptional: true },
                deviceRegistrationId: { type: 'string', isOptional: true },
            },
        },
    },
    '/': {
        post: {
            body: { ...UserCommonRequiredKeys },
        },
    },
    '/:id': {
        put: {
            body: {
                cityId: { ...UserCommonRequiredKeys.cityId, isOptional: true },
                email: { ...UserCommonRequiredKeys.email, isOptional: true },
                firstName: { ...UserCommonRequiredKeys.firstName, isOptional: true },
                lastName: { ...UserCommonRequiredKeys.lastName, isOptional: true },
                address: { ...UserCommonRequiredKeys.address, isOptional: true },
                phoneNumber: { ...UserCommonRequiredKeys.phoneNumber, isOptional: true },
                cnic: { ...UserCommonRequiredKeys.cnic, isOptional: true },
                allowableKeys: ['cityId', 'email', 'firstName', 'lastName', 'address', 'phoneNumber', 'cnic'],
            },
        },
    },
    '/:id/change-password': {
        put: {
            body: {
                oldPassword: { ...UserCommonRequiredKeys.password },
                newPassword: { ...UserCommonRequiredKeys.password },
                confirmPassword: { ...UserCommonRequiredKeys.password },
            },
        },
    },
    '/:id/feedbacks': {
        post: {
            body: {
                description: { type: 'string', isOptional: true },
                rating: { type: 'number' },
            },
        },
    },
};
