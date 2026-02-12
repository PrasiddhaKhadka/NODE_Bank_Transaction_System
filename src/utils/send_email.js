const transporter = require("./nodemailerconfig");

const sendMailAfterLogin = async()=>{
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: "jefferey.goodwin@ethereal.email",
        subject: "Hello ✔",
        text: "Hello world?", // Plain-text version of the message
        html: "<b>Hello world?</b>", // HTML version of the message
    });

    console.log("Message sent:", info.messageId);
}

module.exports = sendMailAfterLogin