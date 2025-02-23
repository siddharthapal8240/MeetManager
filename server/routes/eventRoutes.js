import express from 'express';
import { createEvent } from '../controllers/eventController.js';
import { check } from 'express-validator';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'banner') {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Banner must be an image'));
    }
  } else if (file.fieldname === 'excelFile') {
    if (!['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.mimetype)) {
      return cb(new Error('File must be an Excel spreadsheet'));
    }
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post(
  '/create',
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'excelFile', maxCount: 1 }
  ]),
  [
    check('eventName').notEmpty().withMessage('Event name is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('date').notEmpty().withMessage('Date is required'),
    check('time').notEmpty().withMessage('Time is required'),
    check('meetingLink').isURL().withMessage('Valid meeting link is required'),
    check('registrationType').isIn(['form', 'excel']).withMessage('Invalid registration type')
  ],
  createEvent
);

export default router;