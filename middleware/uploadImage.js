const multer = require('multer')

function uploadImage(folder) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folder}/`)
    },

    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
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

  return multer({
    storage,
    fileFilter
  })
}

module.exports = uploadImage
