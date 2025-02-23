import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import videoRoutes from "./routes/videoRoutes.js";



const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
await connectDB();


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => res.send('Api working!'));
app.use('/api/user', userRouter);
app.use('/api/events', eventRoutes);
app.use('/api', videoRoutes);

//Error handiling

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
});


app.listen(PORT, () =>console.log('Server running on port'+ PORT));