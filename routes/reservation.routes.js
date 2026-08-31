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
const uploadImage = require('../middleware/uploadImage')

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
  uploadImage('prescriptions').single('prescriptionImg'),
  uploadPrescription
)

module.exports = router
