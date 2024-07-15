const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure to load environment variables

// Configure the transporter using Gmail's SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // your email address from environment variables
    pass: process.env.EMAIL_PASS, // your email password from environment variables
  },
});

const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    // Email matter
    await transporter.sendMail({
      to: process.env.EMAIL_USER, // your email address
      from: process.env.EMAIL_USER, // your email address
      subject: "Regarding Mern Portfolio App",
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name: ${name}</p></li>
          <li><p>Email: ${email}</p></li>
          <li><p>Message: ${msg}</p></li>
        </ul>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Your Message Sent Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error: error.message, // Provide the error message for debugging
    });
  }
};

module.exports = { sendEmailController };
