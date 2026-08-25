const Reservation = require('../models/Reservation')

async function createReservation(req, res) {
  try {
    const { pharmacy, medicine, quantity } = req.body

    if (!pharmacy || !medicine || !quantity) {
      return res.status(400).json({
        message: 'Pharmacy, medicine, and quantity are required.'
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
    const reservations = await Reservation.find({
      pharmacy: req.user._id
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

    const reservation = await Reservation.findOne({
      _id: req.params.id,
      pharmacy: req.user._id
    })

    if (!reservation) {
      return res.status(404).json({
        message: 'Reservation not found.'
      })
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
    const reservation = await Reservation.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    })

    if (!reservation) {
      return res.status(404).json({
        message: 'Reservation not found.'
      })
    }

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

module.exports = {
  createReservation,
  getMyReservations,
  getPharmacyReservations,
  updateReservationStatus,
  cancelReservation
}
