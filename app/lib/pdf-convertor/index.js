const ejsToHtml = require('./ejs-to-html');
const htmlToPdf = require('./html-to-pdf');


module.exports = async (templateName, project) => {
    const html = await ejsToHtml(templateName, project || {});
    return htmlToPdf(html)
};

module.exports.ejsToHtml = ejsToHtml
module.exports.htmlToPdf = htmlToPdf