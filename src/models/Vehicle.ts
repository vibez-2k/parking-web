import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
  licensePlate: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['car', 'bike', 'truck'],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);