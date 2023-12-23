const nodemailer = require('nodemailer')

const SendEmailUtility = async (EmailTo , EmailText , EmailSubject)=>{
    let transporter = nodemailer.createTransport({
        // google search "gmail smtp nodemailer"
        //     service: 'gmail',
        //     host: 'smtp.gmail.com',
        //     auth: {
        //         user: 'shoumik152@gmail.com',
        //         pass: 'meow meow meow'
        //     }

        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },tls: {
            rejectUnauthorized: false
        }
    });


    let mailOptions = {
        from:'E-commerce <info@teamrabbil.com>',
        to: EmailTo,
        subject:EmailSubject,
        text:EmailText
    };
    return await transporter.sendMail(mailOptions)
}

module.exports=SendEmailUtility;