import Event from '../models/Event.js';
import { validationResult } from 'express-validator';
import path from 'path';

export const createEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      eventName,
      description,
      date,
      time,
      meetingLink,
      registrationType,
      formFields
    } = req.body;

    const parsedFormFields = typeof formFields === 'string' ? JSON.parse(formFields) : formFields;

    const eventData = {
      eventName,
      description,
      date: new Date(date),
      time,
      meetingLink,
      registrationType,
      formFields: registrationType === 'form' ? parsedFormFields : undefined,
      registrationLink: registrationType === 'form' 
        ? `https://meetmanager.com/register/${Math.random().toString(36).substr(2, 9)}`
        : undefined
    };

    if (req.files) {
      if (req.files.banner) {
        eventData.banner = `/uploads/${req.files.banner[0].filename}`;
      }
      if (req.files.excelFile) {
        eventData.excelFile = `/uploads/${req.files.excelFile[0].filename}`;
      }
    }

    const event = new Event(eventData);
    await event.save();

    res.status(201).json({
      success: true,
      event,
      registrationLink: event.registrationLink
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};