const Pharmacy = require('../models/Pharmacy')

async function getAllPharmacies(req, res) {
  try {
    const pharmacies = await Pharmacy.find()

    return res.status(200).json(pharmacies)
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function getPharmacyById(req, res) {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id)

    if (!pharmacy) {
      return res.status(404).json({
        message: 'Pharmacy not found.'
      })
    }

    return res.status(200).json(pharmacy)
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function createPharmacy(req, res) {
  try {
    const { name, location, phone } = req.body

    if (!name || !location || !phone) {
      return res.status(400).json({
        message: 'Name, location, and phone are required.'
      })
    }

    const pharmacy = await Pharmacy.create({
      name,
      location,
      phone,
      pharmacyImg: req.file ? `/uploads/pharmacies/${req.file.filename}` : '',
      owner: req.user._id
    })

    return res.status(201).json(pharmacy)
  } catch (err) {
    console.error(err)

    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message
      })
    }

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function updatePharmacy(req, res) {
  try {
    const { name, location, phone } = req.body

    if (!name || !location || !phone) {
      return res.status(400).json({
        message: 'Name, location, and phone are required.'
      })
    }

    const updateData = {
      name,
      location,
      phone
    }

    if (req.file) {
      updateData.pharmacyImg = `/uploads/pharmacies/${req.file.filename}`
    }

    const pharmacy = await Pharmacy.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      updateData,
      {
        new: true,
        runValidators: true
      }
    )

    if (!pharmacy) {
      return res.status(404).json({
        message: 'Pharmacy not found.'
      })
    }

    return res.status(200).json(pharmacy)
  } catch (err) {
    console.error(err)

    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message
      })
    }

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function deletePharmacy(req, res) {
  try {
    const pharmacy = await Pharmacy.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    })

    if (!pharmacy) {
      return res.status(404).json({
        message: 'Pharmacy not found.'
      })
    }

    return res.status(200).json({
      message: 'Pharmacy deleted successfully.'
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = {
  getAllPharmacies,
  getPharmacyById,
  createPharmacy,
  updatePharmacy,
  deletePharmacy
}
