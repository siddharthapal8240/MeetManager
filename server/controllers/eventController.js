import { processVideoFile } from './videoController.js';
import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
  const { eventName, description, date, time, registrationType, formFields } = req.body;
  const banner = req.files?.banner?.[0]?.path;
  const excelFile = req.files?.excelFile?.[0]?.path;
  const meetingRecordingFile = req.files?.meetingRecording?.[0]?.path;

  try {
    if (!meetingRecordingFile) {
      return res.status(400).json({ message: 'Meeting recording file is required' });
    }

    // Process the video file and get the Cloudinary URL
    const meetingRecordingUrl = await processVideoFile(meetingRecordingFile);
    if (!meetingRecordingUrl) {
      throw new Error('Failed to process meeting recording');
    }

    const eventData = {
      eventName,
      description,
      date,
      time,
      meetingRecording: meetingRecordingUrl,
      registrationType,
      formFields: registrationType === 'form' ? JSON.parse(formFields) : undefined,
      banner,
      excelFile,
      registrationLink: registrationType === 'form' ? `http://localhost:3000/register/${Date.now()}` : undefined
    };

    const event = new Event(eventData); // Assuming Event is your Mongoose model
    await event.save();

    res.status(201).json({
      message: 'Event created successfully',
      registrationLink: event.registrationLink
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};