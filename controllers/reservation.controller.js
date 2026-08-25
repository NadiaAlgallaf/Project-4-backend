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

module.exports = {
  createReservation
}
