import transporter from "../config/mailConfig.js";
import { extractEmailsFromExcel } from "../utils/excelParser.js";
import fs from "fs/promises";

export const uploadAndSendEmails = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { eventName, date, summary } = req.body; // Expect these from the request
  if (!eventName || !date || !summary) {
    return res.status(400).json({ message: "Event name, date, and summary are required" });
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
          subject: `${eventName} - ${date}`, // Subject with title and date
          text: `Hello,\n\nHere is the summary for the meeting "${eventName}" held on ${date}:\n\n${summary}\n\nBest regards,\nSid`, // Body with summary
        });
        console.log(`Email sent to ${email}`);
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error.message);
      }
    }

    await fs.unlink(filePath); // Clean up the uploaded file
    res.json({ message: "Emails processed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing file" });
  }
};