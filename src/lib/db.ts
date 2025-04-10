import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Error:', err);
  }
};
