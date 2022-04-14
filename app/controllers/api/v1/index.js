('use strict');

const { asyncMiddleware } = global;
const { Roles } = global.appEnums;
const { getHashedPassword } = global.commonFunctions;
const {Users} = global.db;
const { Errors } = global.appTranslations;

module.exports = (router) => {
    router.post(
        '/login',
        asyncMiddleware(async (req, res) => {
            const { email, password } = req.body;

            const user = await Users.$$findOne({
                query: { where: { email, password: getHashedPassword(password) } },
                error: Errors.SignIn.IncorrectEmailPassword,
            });

            res.http200({
                token: user.createToken(),
                user,
            });
        })
    );

    router.post(
        '/signup',
        asyncMiddleware(async (req, res) => {
            const user = await Users.create({ ...req.body, roles: Roles.Employee });
            res.http200({ token: user.createToken(), user });
        })
    );

    router.get(
        '/me',
        asyncMiddleware(async (req, res) => {
            res.http200({
                user: req.user,
            });
        })
    );
};
