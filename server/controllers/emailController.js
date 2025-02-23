import transporter from "../config/mailConfig.js";
import { extractEmailsFromExcel } from "../utils/excelParser.js";
import fs from "fs/promises";

export const uploadAndSendEmails = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const filePath = req.file.path;
    const emailList = extractEmailsFromExcel(filePath);
    
    console.log("Extracted Emails:", emailList);

    for (let email of emailList) {
      try {
        await transporter.sendMail({
          from: '"Sid" <sid@gmail.com>',
          to: email,
          subject: "Test Email",
          text: "Hello, this is a test email sent using Node.js and Nodemailer.",
        });
        console.log(`Email sent to ${email}`);
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error.message);
      }
    }

    await fs.unlink(filePath); 
    res.json({ message: "Emails processed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing file" });
  }
};
