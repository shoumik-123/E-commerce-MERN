const nodemailer = require('nodemailer');

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'mail.teamrabbil.com',
            port: 25,
            secure: false,
            auth: {
                user: 'info@teamrabbil.com',
                pass: '~sR4[bhaC[Qs'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: 'E-commerce <info@teamrabbil.com>',
            to: EmailTo,
            subject: EmailSubject,
            text: EmailText
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result);

        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = SendEmailUtility;
