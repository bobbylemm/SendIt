import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const mailTransport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '587',
    auth: {
        user: 'senditbootcamp@gmail.com',
        pass: 'bobbylemm12345'
    }
}));
const sendEmail = (userEmail, subject, message) => {
    mailTransport.sendMail({
        from: 'SendIt',
        to: userEmail,
        subject,
        text: message
    },(err) => {
        if(err) {
            console.log(`there was an error and the error is ${err}`)
        }
    });
}
export default sendEmail;