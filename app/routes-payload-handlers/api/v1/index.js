module.exports = {
    'login': {
        post: {
            body: {
                email: { type: 'string', isEmail: true },
                password: { type: 'string' },
            },
        },
    },
};
