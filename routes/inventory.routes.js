const express = require('express')
const router = express.Router()
const {
  addMedicine,
  getMyInventory,
  getMedicineAvailability,
  deleteMedicine,
  updateStock
} = require('../controllers/Inventory.controller')
const verifyToken = require('../middleware/verifyToken')
const authorizeRole = require('../middleware/authorizeRole')

router.post('/', verifyToken, authorizeRole('Pharmacy'), addMedicine)

router.get(
  '/my-inventory',
  verifyToken,
  authorizeRole('Pharmacy'),
  getMyInventory
)

router.get('/medicine/:medicineId', getMedicineAvailability)

router.patch('/:id', verifyToken, authorizeRole('Pharmacy'), updateStock)

router.delete('/:id', verifyToken, authorizeRole('Pharmacy'), deleteMedicine)

module.exports = router
