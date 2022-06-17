const pdf = require('html-pdf');
const options = {
    format: 'A4',
    "header": {
        "height": "20mm",
    },
    "footer": {
        "height": "20mm",
    },
    "orientation": "portrait",
    "zoomFactor": "1",
    "type": "pdf",
    "quality": "75",
}

module.exports = (html) => {
    return new Promise((resolve, reject) => {
        pdf.create(html, options).toBuffer((err, pdf) => {
            if (err) {
                return reject(err);
            }
            return resolve(pdf);
        });
    });
};