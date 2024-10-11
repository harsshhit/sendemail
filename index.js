const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json()); // To parse incoming form data

// Route to handle form submission
app.post("/send-email", (req, res) => {
  const { name, email } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail", // You can use other services like Outlook, etc.
    auth: {
      user: "marketing@houseofmarktech.com", // Replace with your email
      pass: "qipw jimu taij lthn", // Replace with your email password
    },
  });

  // Define the email options
  const mailOptions = {
    from: "marketing@houseofmarktech.com", // Sender address
    to: email, // Recipient email
    subject: `Proposal for ${name}`,
    text: `Hello ${name},\n\nPlease find the attached proposal document. Here is our proposal link: https://drive.google.com/file/d/1O7WD7Sev7TDl8lb_Bgb00X1XOBTVL4rU/view?usp=sharing`,
    // attachments: [
    //   {
    //     filename: "proposal.pdf",
    //     path: path.join(__dirname, "proposal.pdf"), // Path to the PDF file on your server
    //   },
    // ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
