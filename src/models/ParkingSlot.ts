import mongoose from 'mongoose';

const ParkingSlotSchema = new mongoose.Schema({
  slotNumber: {
    type: String,
    required: true,
    unique: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    default: null,
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'reserved', 'maintenance'],
    default: 'available',
  },
  floor: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['car', 'bike', 'truck'],
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.ParkingSlot || mongoose.model('ParkingSlot', ParkingSlotSchema);