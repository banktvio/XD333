const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Function to get client's IP address
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
}

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'banktvio4@gmail.com', // Your email
        pass: 'your_password' // Your email password (recommend to use App Password)
    }
});

app.get('/', (req, res) => {
    // Serve the HTML page
    res.sendFile(__dirname + '/index.html');

    // Get client IP
    const clientIP = getClientIP(req);
    
    // Set up email data
    const mailOptions = {
        from: 'banktvio4@gmail.com',
        to: 'banktvio4@gmail.com',
        subject: 'New Visitor IP',
        text: `A new visitor has entered your website. IP Address: ${clientIP}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
