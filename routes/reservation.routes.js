const express = require('express')
const router = express.Router()
const {
  createReservation,
  getMyReservations,
  getPharmacyReservations,
  updateReservationStatus,
  cancelReservation,
  uploadPrescription
} = require('../controllers/reservation.controller')
const verifyToken = require('../middleware/verifyToken')
const authorizeRole = require('../middleware/authorizeRole')
const upload = require('../middleware/uploadPrescription')

router.post('/', verifyToken, authorizeRole('User'), createReservation)

router.get(
  '/my-reservations',
  verifyToken,
  authorizeRole('User'),
  getMyReservations
)

router.get(
  '/pharmacy',
  verifyToken,
  authorizeRole('Pharmacy'),
  getPharmacyReservations
)

router.patch(
  '/:id/status',
  verifyToken,
  authorizeRole('Pharmacy'),
  updateReservationStatus
)

router.delete('/:id', verifyToken, authorizeRole('User'), cancelReservation)

router.post(
  '/:id/prescription',
  verifyToken,
  authorizeRole('User'),
  upload.single('prescription'),
  uploadPrescription
)

module.exports = router
