const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// create the express app
const app = express();

// use body parser to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create a transporter object using your email provider
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'andymelvin56@gmail.com',
        pass: 'themat'
    }
});

// create the endpoint for the form
app.post('/send-email', (req, res) => {
    // setup email data
    // sendgrid
    let mailOptions = {
        from: `${req.body.email}`,
        to: 'andymelvin56@gmail.com',
        subject: 'Contact Form Message',
        text: `Name: ${req.body.Names}\nEmail: ${req.body.email}\nPhone: ${req.body.Phone}\nMessage: ${req.body.textarea}`
    };

    // send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    res.send('Form submitted successfully');
});

// start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
