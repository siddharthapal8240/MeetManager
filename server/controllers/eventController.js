import { processVideoFile } from './videoController.js';
import Event from '../models/Event.js';
import fetch from 'node-fetch';

export const createEvent = async (req, res) => {
  console.log('Received request body:', req.body);
  console.log('Received files:', req.files);

  const { eventName, description, date, time, registrationType, formFields } = req.body;
  const banner = req.files?.banner?.[0]?.path;
  const excelFile = req.files?.excelFile?.[0]?.path;
  const meetingRecordingFile = req.files?.meetingRecording?.[0]?.path;

  try {
    if (!meetingRecordingFile) {
      console.log('Missing meeting recording file');
      return res.status(400).json({ message: 'Meeting recording file is required' });
    }

    console.log('Processing video file:', meetingRecordingFile);
    const result = await processVideoFile(meetingRecordingFile);
    if (!result || !result.videoUrl) {
      console.log('Video processing failed');
      throw new Error('Failed to process meeting recording');
    }
    console.log('Video processed successfully:', result);

    const eventData = {
      eventName,
      description,
      date,
      time,
      meetingRecording: result.videoUrl,
      transcription: result.transcription,
      registrationType,
      formFields: registrationType === 'form' ? JSON.parse(formFields) : undefined,
      banner,
      excelFile,
      registrationLink: registrationType === 'form' ? `http://localhost:3000/register/${Date.now()}` : undefined
    };

    console.log('Saving event:', eventData);
    const event = new Event(eventData);
    await event.save();
    console.log('Event saved successfully:', event);

    res.status(201).json({
      message: 'Event created successfully',
      registrationLink: event.registrationLink
    });
  } catch (error) {
    console.error('Error in createEvent:', error.message, error.stack);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

export const getPastEvents = async (req, res) => {
  try {
    const currentDate = new Date();
    const pastEvents = await Event.find({
      date: { $lt: currentDate }
    }).sort({ date: -1 });

    res.status(200).json(pastEvents);
  } catch (error) {
    console.error('Error fetching past events:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to fetch past events' });
  }
};

export const aiChat = async (req, res) => {
  const { summary, question } = req.body;

  if (!summary || !question) {
    return res.status(400).json({ message: 'Summary and question are required' });
  }

  const prompt = `
    Based on the following meeting summary, answer the user's question:
    
    **Meeting Summary:**
    ${summary}
    
    **User Question:**
    ${question}
  `;

  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to get AI response');
    }

    const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI';
    res.status(200).json({ response: aiResponseText });
  } catch (error) {
    console.error('Error in aiChat:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to get AI response' });
  }
};