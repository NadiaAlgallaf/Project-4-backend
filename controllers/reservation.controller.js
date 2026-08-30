const Reservation = require('../models/Reservation')
const Prescription = require('../models/Prescription')
const Inventory = require('../models/Inventory')
const Pharmacy = require('../models/Pharmacy')

async function createReservation(req, res) {
  try {
    const { pharmacy, medicine, quantity } = req.body

    if (!pharmacy || !medicine || !quantity) {
      return res.status(400).json({
        message: 'Pharmacy, medicine, and quantity are required.'
      })
    }

    if (quantity < 1) {
      return res.status(400).json({
        message: 'Quantity must be at least 1.'
      })
    }

    const pharmacyExists = await Pharmacy.findById(pharmacy)

    if (!pharmacyExists) {
      return res.status(404).json({
        message: 'Pharmacy not found.'
      })
    }

    const inventory = await Inventory.findOne({
      pharmacy: pharmacy,
      medicine: medicine
    })

    if (!inventory) {
      return res.status(404).json({
        message: 'Medicine is not available at this pharmacy.'
      })
    }

    if (inventory.stock < quantity) {
      return res.status(400).json({
        message: `Only ${inventory.stock} item(s) available.`
      })
    }

    const reservation = await Reservation.create({
      user: req.user._id,
      pharmacy,
      medicine,
      quantity
    })

    return res.status(201).json(reservation)
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function getMyReservations(req, res) {
  try {
    const reservations = await Reservation.find({
      user: req.user._id
    })
      .populate('pharmacy')
      .populate('medicine')
      .populate('prescription')

    return res.status(200).json(reservations)
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function getPharmacyReservations(req, res) {
  try {
    const pharmacy = await Pharmacy.findOne({
      owner: req.user._id
    })

    if (!pharmacy) {
      return res.status(404).json({
        message: 'Pharmacy not found for this user.'
      })
    }

    const reservations = await Reservation.find({
      pharmacy: pharmacy._id
    })
      .populate('user')
      .populate('medicine')
      .populate('prescription')

    return res.status(200).json(reservations)
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function updateReservationStatus(req, res) {
  try {
    const { status } = req.body

    if (!status) {
      return res.status(400).json({
        message: 'Status is required.'
      })
    }

    const pharmacy = await Pharmacy.findOne({
      owner: req.user._id
    })

    if (!pharmacy) {
      return res.status(404).json({
        message: 'Pharmacy not found for this user.'
      })
    }

    const reservation = await Reservation.findOne({
      _id: req.params.id,
      pharmacy: pharmacy._id
    }).populate('medicine')

    if (!reservation) {
      return res.status(404).json({
        message: 'Reservation not found.'
      })
    }

    const allowedTransitions = {
      Pending: ['Approved', 'Rejected'],
      Approved: ['Ready'],
      Ready: ['Collected'],
      Collected: [],
      Rejected: []
    }

    if (!allowedTransitions[reservation.status]?.includes(status)) {
      return res.status(400).json({
        message: `Cannot change reservation status from ${reservation.status} to ${status}.`
      })
    }

    if (
      status === 'Approved' &&
      reservation.medicine.requiresPrescription &&
      !reservation.prescription
    ) {
      return res.status(400).json({
        message: 'Prescription is required before approving this reservation.'
      })
    }

    if (status === 'Approved') {
      const inventory = await Inventory.findOne({
        pharmacy: reservation.pharmacy,
        medicine: reservation.medicine._id
      })

      if (!inventory) {
        return res.status(404).json({
          message: 'Medicine is not available in inventory.'
        })
      }

      if (inventory.stock < reservation.quantity) {
        return res.status(400).json({
          message: `Only ${inventory.stock} item(s) available.`
        })
      }

      inventory.stock -= reservation.quantity
      await inventory.save()
    }

    reservation.status = status

    await reservation.save()

    return res.status(200).json(reservation)
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

async function cancelReservation(req, res) {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,
      user: req.user._id
    })

    if (!reservation) {
      return res.status(404).json({
        message: 'Reservation not found.'
      })
    }

    if (reservation.status !== 'Pending') {
      return res.status(400).json({
        message: 'Only Pending reservations can be cancelled'
      })
    }

    await reservation.deleteOne()

    return res.status(200).json({
      message: 'Reservation cancelled successfully.'
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function uploadPrescription(req, res) {
  try {
    const { imageUrl } = req.body

    if (!imageUrl) {
      return res.status(400).json({
        message: 'Prescription image is required.'
      })
    }

    const reservation = await Reservation.findOne({
      _id: req.params.id,
      user: req.user._id
    })

    if (!reservation) {
      return res.status(404).json({
        message: 'Reservation not found.'
      })
    }

    const prescription = await Prescription.create({
      user: req.user._id,
      imageUrl,
      uploadDate: new Date()
    })

    reservation.prescription = prescription._id
    await reservation.save()

    return res.status(201).json(prescription)
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = {
  createReservation,
  getMyReservations,
  getPharmacyReservations,
  updateReservationStatus,
  cancelReservation,
  uploadPrescription
}
