var pm2 = require('pm2')
var nodemailer = require("nodemailer");
pm2.launchBus(function(err, bus) {
    bus.on('process:event', function(e) {
      if (e.event == 'restart' || e.event == 'stop' || e.event == 'start') {
        message = 'The User: '+e.process.username+' has '+e.event+' The process '+ e.process.name;
        subject = e.process.name+'-'+e.event;
        console.log('message:', message);
        console.log('subject:', subject);
        let transporter = nodemailer.createTransport({
          sendmail: true,
          newline: 'unix',
          path: '/usr/sbin/sendmail'
        });
        transporter.sendMail({
            from: process.env.PM2EMAILFROM,
            to: process.env.PM2EMAILTO,
            subject: subject,
            text: message
        }, (err, info) => {
            console.log('Email send');
            console.log(info.envelope);
            console.log(info.messageId);
        });
      }
    });
});