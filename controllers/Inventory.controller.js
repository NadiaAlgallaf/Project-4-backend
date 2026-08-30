const Inventory = require('../models/Inventory')
const Pharmacy = require('../models/Pharmacy')

async function addMedicine(req, res) {
  try {
    const { medicine, stock } = req.body

    if (!medicine || stock === undefined) {
      return res.status(400).json({
        message: 'Medicine and stock are required.'
      })
    }

    if (stock < 0) {
      return res.status(400).json({
        message: 'Stock cannot be negative. '
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

    const existingInventory = await Inventory.findOne({
      pharmacy: pharmacy._id,
      medicine
    })

    if (existingInventory) {
      return res.status(409).json({
        message: 'Medicine already exists in inventory.'
      })
    }
    const inventory = await Inventory.create({
      pharmacy: pharmacy._id,
      medicine,
      stock
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

async function updateStock(req, res) {
  try {
    const { stock } = req.body

    if (stock === undefined) {
      return res.status(400).json({
        message: 'Stock is required.'
      })
    }

    if (stock < 0) {
      return res.status(400).json({
        message: 'Stock cannot be negative.'
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

    const inventory = await Inventory.findOneAndUpdate(
      { _id: req.params.id, pharmacy: pharmacy._id },
      { stock },
      { new: true }
    ).populate('medicine')

    if (!inventory) {
      return res.status(404).json({
        message: 'Medicine not found in inventory.'
      })
    }
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
async function getMedicineAvailability(req, res) {
  try {
    const inventory = await Inventory.find({
      medicine: req.params.medicineId,
      stock: { $gt: 0 }
    })
      .populate('pharmacy')
      .populate('medicine')

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
  getMyInventory,
  updateStock,
  deleteMedicine,
  getMedicineAvailability
}
