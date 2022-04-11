module.exports = {
    '/': {
        post: {
            body: { name: 'string', allowableKeys: ['name'] },
        },
        put: {
            body: { name: 'string', allowableKeys: ['name'] },
        },
    },
};
