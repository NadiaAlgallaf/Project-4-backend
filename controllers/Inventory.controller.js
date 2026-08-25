const Inventory = require('../models/Inventory')

async function addMedicine(req, res) {
  try {
    const { medicine } = req.body

    if (!medicine) {
      return res.status(400).json({
        message: 'Medicine is required.'
      })
    }

    const inventory = await Inventory.create({
      pharmacy: req.user._id,
      medicine
    })

    return res.status(201).json(inventory)
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function getMyInventory(req, res) {
  try {
    const inventory = await Inventory.find({
      pharmacy: req.user._id
    }).populate('medicine')

    return res.status(200).json(inventory)
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = {
  addMedicine,
  getMyInventory
}
