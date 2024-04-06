import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//Routes Imported
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import jobRoutes from './routes/job.route.js';
import schemeRoutes from './routes/govt.route.js';
import scholarRoutes from './routes/scholarship.route.js';
import detailRoutes from './routes/MoreDetails.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from "url";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log("Error while connecting",err);
  });

  const __filename=fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use(cors({
  origin: '*' ,
  credentials:true
}) )

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/job',jobRoutes)
app.use('/api/scheme',schemeRoutes)
app.use('/api/scholar',scholarRoutes)
app.use('/api/details',detailRoutes)

console.log(__dirname)
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
