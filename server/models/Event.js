import mongoose from 'mongoose';

const formFieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['text', 'email', 'number', 'tel', 'radio', 'checkbox', 'select', 'textarea'],
    required: true 
  },
  required: { type: Boolean, default: false },
  locked: { type: Boolean, default: false }
});

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  meetingLink: { type: String, required: true },
  registrationType: { 
    type: String, 
    enum: ['form', 'excel'], 
    required: true 
  },
  formFields: [formFieldSchema],
  banner: { type: String },
  excelFile: { type: String },
  registrationLink: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema);