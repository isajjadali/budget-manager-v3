const { Password } = global.appTranslations.Errors;
const { getHashedPassword } = global.commonFunctions;

module.exports.oldPasswordValidator = function (req, res, next) {
    const { oldPassword } = req.body;
    return (getHashedPassword(oldPassword) !== req.user.password)
        ? res.http500(Password.Validations.IncorrectOldPassword)
        : next();
};

module.exports.passwordChangeValidator = function (req, res, next) {
    const { newPassword } = req.body;
    return (getHashedPassword(newPassword) === req.user.password)
        ? res.http500(Password.Validations.NewAndOldPasswordAreSame)
        : next();
};

module.exports.newAndConfirmPasswordValidator = function (req, res, next) {
    const { newPassword, confirmPassword } = req.body;
    return (newPassword !== confirmPassword)
        ? res.http500(Password.Validations.NewAndConfirmPasswordNotMatched)
        : next();
};
