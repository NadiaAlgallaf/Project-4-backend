const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true
    },

    firstName: {
      type: String,
      required: function () {
        return this.role === 'User'
      },
      trim: true
    },

    lastName: {
      type: String,
      required: function () {
        return this.role === 'User'
      },
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
      enum: ['User', 'Pharmacy'],
      required: true,
      default: 'User'
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
