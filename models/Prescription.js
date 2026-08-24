import mongoose from 'mongoose'

const prescriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  imageUrl: {
    type: String,
    required: true,
    trim: true
  },

  uploadDate: {
    type: Date,
    required: true,
    trim: true
  },

  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true
  }
})

const Prescription = mongoose.model('Prescription', prescriptionSchema)

module.exports = Prescription
