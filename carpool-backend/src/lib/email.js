const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = ({ verificationCodes, email }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'UniPool.Inquiry@gmail.com',
            pass: process.env.GMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'UniPool.Inquiry@gmail.com',
        to: email,
        subject: 'Welcome to Carpool. Please confirm email',
        html: '<h1><img src="cid:carpool@logo.img" alt="logo" width="300"/></h1>' +
            '<p>Your verification code is <strong>'+ verificationCodes +'</strong></p>',
        attachments: [{
            filename: 'logo.png',
            path: __dirname + '/img/logo.png',
            cid: 'carpool@logo.img'
        }]
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return error;
        } else {
            console.log('Email sent: ' + info.response);
            return 'Email sent: ' + info.response;
        }
    });
};