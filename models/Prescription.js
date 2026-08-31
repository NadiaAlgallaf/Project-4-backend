const mongoose = require('mongoose')

const prescriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    prescriptionImg: {
      type: String,
      required: true,
      trim: true
    },

    uploadDate: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  { timestamps: true }
)

const Prescription = mongoose.model('Prescription', prescriptionSchema)

module.exports = Prescription
