const Medicine = require('../models/Medicine')

async function getAllMedicines(req, res) {
  try {
    const medicines = await Medicine.find()

    return res.status(200).json(medicines)
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function getMedicineById(req, res) {
  try {
    const medicine = await Medicine.findById(req.params.id)

    if (!medicine) {
      return res.status(404).json({
        message: 'Medicine not found.'
      })
    }

    return res.status(200).json(medicine)
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function createMedicine(req, res) {
  try {
    const {
      genericName,
      brandName,
      dosage,
      dosageForm,
      category,
      price,
      requiresPrescription
    } = req.body

    if (
      !genericName ||
      !brandName ||
      !dosage ||
      !dosageForm ||
      !category ||
      price === undefined ||
      requiresPrescription === undefined
    ) {
      return res.status(400).json({
        message:
          'Generic name, brand name, dosage, dosage form, category, price, and prescription requirement are required.'
      })
    }

    if (requiresPrescription !== 'true' && requiresPrescription !== 'false') {
      return res.status(400).json({
        message: 'requiresPrescription must be true or false.'
      })
    }

    const medicine = await Medicine.create({
      genericName,
      brandName,
      dosage,
      dosageForm,
      category,
      price,
      requiresPrescription: requiresPrescription === 'true',
      medicineImg: req.file ? `/uploads/medicines/${req.file.filename}` : ''
    })

    return res.status(201).json(medicine)
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

async function updateMedicine(req, res) {
  try {
    const {
      genericName,
      brandName,
      dosage,
      dosageForm,
      category,
      price,
      requiresPrescription
    } = req.body

    if (
      !genericName ||
      !brandName ||
      !dosage ||
      !dosageForm ||
      !category ||
      price === undefined ||
      requiresPrescription === undefined
    ) {
      return res.status(400).json({
        message:
          'Generic name, brand name, dosage, dosage form, category, price, and prescription requirement are required.'
      })
    }

    if (requiresPrescription !== 'true' && requiresPrescription !== 'false') {
      return res.status(400).json({
        message: 'requiresPrescription must be true or false.'
      })
    }

    const updateData = {
      genericName,
      brandName,
      dosage,
      dosageForm,
      category,
      price,
      requiresPrescription: requiresPrescription === 'true'
    }

    if (req.file) {
      updateData.medicineImg = `/uploads/medicines/${req.file.filename}`
    }

    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    )

    if (!medicine) {
      return res.status(404).json({
        message: 'Medicine not found.'
      })
    }

    return res.status(200).json(medicine)
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

async function deleteMedicine(req, res) {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id)

    if (!medicine) {
      return res.status(404).json({
        message: 'Medicine not found.'
      })
    }

    return res.status(200).json({
      message: 'Medicine deleted successfully.'
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine
}
