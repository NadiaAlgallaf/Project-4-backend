const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/prescriptions')
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname

    cb(null, uniqueName)
  }
})

const fileFilter = function (req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only JPG and PNG images are allowed'), false)
  }
}

const upload = multer({
  storage,
  fileFilter
})

module.exports = upload
