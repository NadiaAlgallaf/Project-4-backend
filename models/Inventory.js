import mongoose from 'mongoose'

const inventorySchema = new moongose.Schema(
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
    }
  },
  { timeStamps: true }
)

const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = Inventory
