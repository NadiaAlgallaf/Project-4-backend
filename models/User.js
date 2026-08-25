const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },

    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email address'
      }
    },

    hashedPassword: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: {
        values: ['User', 'Pharmacy']
      },
      required: true
    },

    pharmacyName: {
      type: String,
      required: [true, 'Pharmacy name is required']
    }
  },
  { timestamps: true }
)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
