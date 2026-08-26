const Inventory = require('../models/Inventory')
const Pharmacy = require('../models/Pharmacy')

async function addMedicine(req, res) {
  try {
    const { medicine } = req.body

    if (!medicine) {
      return res.status(400).json({
        message: 'Medicine is required.'
      })
    }

    const pharmacy = await Pharmacy.findOne({
      owner: req.user._id
    })

    if (!pharmacy) {
      return res.status(404).json({
        message: 'Pharmacy not found.'
      })
    }

    const inventory = await Inventory.create({
      pharmacy: pharmacy._id,
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
    const pharmacy = await Pharmacy.findOne({
      owner: req.user._id
    })

    if (!pharmacy) {
      return res.status(404).json({
        message: 'Pharmacy not found.'
      })
    }

    const inventory = await Inventory.find({
      pharmacy: pharmacy._id
    }).populate('medicine')

    return res.status(200).json(inventory)
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function deleteMedicine(req, res) {
  try {
    const pharmacy = await Pharmacy.findOne({
      owner: req.user._id
    })

    if (!pharmacy) {
      return res.status(404).json({
        message: 'Pharmacy not found.'
      })
    }

    const inventory = await Inventory.findOneAndDelete({
      _id: req.params.id,
      pharmacy: pharmacy._id
    })

    if (!inventory) {
      return res.status(404).json({
        message: 'Medicine not found in inventory.'
      })
    }

    return res.status(200).json({
      message: 'Medicine removed from inventory.'
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = {
  addMedicine,
  getMyInventory,
  deleteMedicine
}
