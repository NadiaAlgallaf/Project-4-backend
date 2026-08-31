const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema(
  {
    genericName: {
      type: String,
      required: true,
      trim: true
    },

    brandName: {
      type: String,
      required: true,
      trim: true
    },

    dosage: {
      type: String,
      required: true,
      trim: true
    },

    dosageForm: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    medicineImg: {
      type: String,
      trim: true
    },

    requiresPrescription: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
)

const Medicine = mongoose.model('Medicine', medicineSchema)

module.exports = Medicine
