const express = require("express");
var nodemailer = require('nodemailer');
const app = express();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'destin.balistreri18@ethereal.email',
        pass: 'CTWWNPGnVHpwVKyR4w'
    }
});

   function generate_mail_option(title, under_title){
    return {
        from: 'destin.balistreri18@ethereal.email',
        to: 'david.ter.18@gmail.com',
        subject: title,
        text: under_title
      }
   }
function send_mail(mailOptions){
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});
app.post("/", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    let title = request.body.email + ", " + request.body.name
    let under_title = request.body.tel + " /n" + request.body.info
    send_mail(generate_mail_option(title, under_title))
    return response.sendStatus(200);
});

app.listen(3000, ()=>console.log("Сервер запущен..."));