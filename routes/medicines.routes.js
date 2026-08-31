const router = require('express').Router()

const authorizeRole = require('../middleware/authorizeRole')
const verifyToken = require('../middleware/verifyToken')
const uploadImage = require('../middleware/uploadImage')

const medicinesController = require('../controllers/medicines.controller')

router.get('/', medicinesController.getAllMedicines)

router.get('/:id', medicinesController.getMedicineById)

router.post(
  '/',
  verifyToken,
  authorizeRole('Pharmacy'),
  uploadImage('medicines').single('medicineImg'),
  medicinesController.createMedicine
)

router.patch(
  '/:id',
  verifyToken,
  authorizeRole('Pharmacy'),
  uploadImage('medicines').single('medicineImg'),
  medicinesController.updateMedicine
)

router.delete(
  '/:id',
  verifyToken,
  authorizeRole('Pharmacy'),
  medicinesController.deleteMedicine
)

module.exports = router
