const path = require('path');
const inlineCss = require('inline-css');
const templateMaker = require('./../email-sender/template-maker');
const constants = require('../../templates/constants');
const inlineOption = {
    applyStyleTags: true,
    url: "budget_manager"
};

module.exports = async (templateName, data) => {
    const html = await templateMaker(path.resolve(path.join(__dirname, `../../templates/${templateName}.ejs`)), {
        ...constants.helperFun,
        ...constants[templateName],
        ...data,
    } || {});
    return inlineCss(html, inlineOption);
};