const { decodeAPiToken } = global.commonFunctions;
const { Errors } = global.appTranslations;
const { log } = global;
const { Users } = global.db;

module.exports = function () {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!authorization) throw Errors.Auth.AuthorizationHeaderMissing;

            const token = authorization.split(' ')[1];
            const decodedToken = await decodeAPiToken(token);

            if (!decodedToken) throw Errors.Auth.InvalidToken;

            const user = await Users.$$findOne({
                query: {
                    where: {
                        id: decodedToken.id,
                        email: decodedToken.email,
                        deleted: false,
                    }
                },
                error: Errors.Auth.InvalidToken,
            });

            const onlineDetails = await user.getOnlineDevices({ where: { id: decodedToken.onlineId } });
            if (!onlineDetails.length) {
                throw Errors.Auth.UnSynchronized;
            }

            user.dataValues.onlineId = decodedToken.onlineId;
            req.user = user;
            next();
        } catch (err) {
            log.error(err);
            return res.http401(err);
        }
    };
};
