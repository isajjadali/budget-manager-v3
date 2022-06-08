const { Projects } = global.db;
const sendMail = require(`${global.paths.lib}/email-sender`);

module.exports = (router) => {
    router.param(
        "projectId",
        asyncMiddleware(async (req, res, next, projectId) => {
            const project = await Projects.$$findByPk({ id: +projectId });
            req.project = project;
            next();
        })
    );
    router
        .post("/:projectId",
            asyncMiddleware((req, res, next) => {
                sendMail("common-email-format", {
                    to: req.project.clientEmail,
                    subject: "Project invoice",
                    variables: {
                        userName: "Hassan Ali",
                        url: `${"https://codebeautify.org/"}/email-changed`,
                        button_text: 'buttonText',
                        email_content: 'Please find the attachment below.'
                    },
                });
                res.http200("Mail sent successfully!");
            })
        )
};


