const mongoose = require('mongoose')

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
      required: false
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    status: {
      type: String,
      enum: {
        values: ['Pending', 'Approved', 'Ready', 'Collected', 'Rejected']
      },
      default: 'Pending'
    }
  },
  { timestamps: true }
)

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation
