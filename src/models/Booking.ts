import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true
  },
  spotNumber: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  vehicle: {
    type: {
      type: String,
      enum: ['car', 'motorcycle', 'truck'],
      required: true
    },
    licensePlate: {
      type: String,
      required: true
    },
    make: String,
    model: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  notes: {
    type: String
  }
}, { timestamps: true });

// Add index for quick lookups
BookingSchema.index({ venue: 1, startTime: 1, endTime: 1 });
BookingSchema.index({ user: 1, status: 1 });

// Add method to check availability
BookingSchema.statics.checkAvailability = async function(venueId, startTime, endTime) {
  const conflictingBookings = await this.find({
    venue: venueId,
    status: { $in: ['confirmed', 'active'] },
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
    ]
  });
  return conflictingBookings.length === 0;
};

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);