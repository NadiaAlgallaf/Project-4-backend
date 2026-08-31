const router = require('express').Router()

const verifyToken = require('../middleware/verifyToken')
const uploadImage = require('../middleware/uploadImage')

const authController = require('../controllers/auth.controller')

router.post(
  '/sign-up',
  uploadImage('pharmacies').single('pharmacyImg'),
  authController.signUp
)

router.post('/sign-in', authController.signIn)

router.get('/me', verifyToken, authController.verifyUser)

module.exports = router
