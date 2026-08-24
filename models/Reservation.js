import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pharmacy',
      required: true
    },

    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true
    },

    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prescription',
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: {
        values: ['Pending', 'Approved', 'Ready', 'Collected', 'Rejected']
      }
    },

    createdAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
)

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation
