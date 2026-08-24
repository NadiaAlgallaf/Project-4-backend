import mongoose from 'mongoose'

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    dosage: {
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
      trim: true
    },

    stock: {
      type: Number,
      required: true,
      trim: true
    },

    requiresPrescription: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
)

const Medicine = mongoose.model('Medicine', medicineSchema)

module.exports = Medicine
