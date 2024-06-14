import nodeMailer from "nodemailer";
import 'dotenv/config';

export default async function sendEmail(options) {
    try {
        //process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        const transporter = nodeMailer.createTransport({
            host: process.env.SMPT_HOST,
            port: parseInt(process.env.SMPT_PORT), // Ensure port is parsed as integer
            //secure: true,
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_APP_PASS,
            },
            authMethod: 'LOGIN', // Specify the authentication method if required
        });
        console.log(process.env.SMPT_MAIL +" "+ process.env.SMPT_APP_PASS)
        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: options.to,
            subject: options.subject,
            html: options.message,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Rethrow the error to handle it elsewhere if needed
    }
}
