const ejs = require('ejs');

module.exports = function renderEjs(fileName = '', variables = {}) {
    return new Promise((resolve, reject) => {
        ejs.renderFile(fileName, variables, function (err, data) {
            if (err) {
                console.log(err)
                return reject(err);
            }
            return resolve(data);
        });
    });
};
