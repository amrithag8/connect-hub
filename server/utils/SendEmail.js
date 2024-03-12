const nodemailer = require("nodemailer");

const SendEmail=async(usermail, otp)=>{


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "g8amrutha@gmail.com",
    pass: "ogeolqqkzivzxiln",
  },
});

// async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"no-reply@connectapp.com" <g8amrutha@gmail.com>', // sender address
    to: usermail, // list of receivers
    subject: "OTP", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>Hello ${usermail}</b> <p>Your one time password is ${otp}</p>`, // html body
  });

  
}

module.exports=SendEmail;