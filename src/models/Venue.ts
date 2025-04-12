import mongoose from 'mongoose';

const VenueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  totalSpots: {
    type: Number,
    required: true,
    min: 1
  },
  availableSpots: {
    type: Number,
    required: true,
    min: 0
  },
  pricePerHour: {
    type: Number,
    required: true,
    min: 0
  },
  operatingHours: {
    open: { type: String, required: true },
    close: { type: String, required: true }
  },
  amenities: [{
    type: String,
    enum: ['security', 'camera', 'covered', 'ev_charging', 'valet', 'car_wash']
  }],
  status: {
    type: String,
    enum: ['active', 'maintenance', 'closed'],
    default: 'active'
  }
}, { timestamps: true });

export default mongoose.models.Venue || mongoose.model('Venue', VenueSchema);