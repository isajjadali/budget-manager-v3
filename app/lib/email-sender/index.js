const path = require('path');
const templateMaker = require('./template-maker');
const sendEmail = require('./mailer');


module.exports = async function (templateName, mailOptions) {
    try {
        const html = await templateMaker(path.resolve(path.join(__dirname, `../../view/${templateName}.ejs`)), mailOptions.variables || {});
        delete mailOptions.variables;
        return sendEmail({ ...mailOptions, from: process.env.EMAIL, html })
    } catch (e) {
        console.error(e);
        return e;
    }
};
