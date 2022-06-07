const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'hali8629@gmail.com',
            pass: 'whecyxvoftqqrkmp'
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Hassan Ali" <hali8629@gmail.com>', // sender address
        to: "mbasitali781@gmail.com", // list of receivers
        subject: "This is important email", // Subject line
        // text: "We want to inform you please fill up the form?", // plain text body
        html: "<b>We want to inform you please fill up the form?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
