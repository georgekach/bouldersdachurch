/**
 * Created by George on 3/9/2016.
 */
'use strict';

var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        //user: 'kachambwa.george@gmail.com',
        //pass: ''
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'George Takaedza Kachambwa ? <kachambwa.george@gmail.com>', // sender address
    to: 'kachambwa.george@gmail.com', // list of receivers
    subject: 'Hello ?', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
};



exports.sendEmail = function(emailadd,subject,message){
    // send mail with defined transport object
transporter.sendMail(mailOptions, function (error, info) {
   if (error) {
       console.log(error);
   } else {
      console.log('Message sent: ' + info.response);
   }
});
};
