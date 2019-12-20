const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
require('dotenv').config()

const option = {
    service: 'gmail',
    host: "smtp.gmail.com",

    auth: {
        type: "login", // default
        user: process.env.MAIL_SENDER_ADDRESS,
        pass: process.env.MAIL_SENDER_PASSWORD
    }
};

const readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

let transporter = nodemailer.createTransport(option);

const sendVerificationCode = (mail_receiver, verification) => {
    return new Promise((resolve, reject) => {
            transporter.verify(function (error, success) {
                if (error) reject(error)
                else {
                    readHTMLFile(__dirname + '/template/email/email.html', function (err, html) {
                        if (err) reject(error)
                        else {
                            let template = handlebars.compile(html);
                            let replacements = {
                                verification: verification
                            };
                            let htmlToSend = template(replacements);
                            let mail = {
                                from: process.env.MAIL_SENDER_ADDRESS,
                                to: mail_receiver,
                                html: htmlToSend,
                                subject: 'OSIP Register verification code',
                            };

                            transporter.sendMail(mail, function (error, response) {
                                if (error) {
                                    reject(error);
                                }
                            });
                        }
                    })
                }
                resolve();
            })
        }
    )
}


module.exports = {
    sendVerificationCode
}

