import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' } // can be 'admin', 'manager', etc.
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
