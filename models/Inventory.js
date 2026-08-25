const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema(
  {
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

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    }
  },
  { timestamps: true }
)

const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = Inventory