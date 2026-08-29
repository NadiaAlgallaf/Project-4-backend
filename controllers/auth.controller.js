const bcrypt = require('bcrypt')
const User = require('../models/User')
const Pharmacy = require('../models/Pharmacy')
const jwt = require('jsonwebtoken')

async function signUp(req, res) {
  try {
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      role,
      pharmacyName,
      location,
      phone
    } = req.body

    // Validation
    if (!username || !email || !password || !role) {
      return res.status(400).json({
        message: 'Username, email, password, and role are required.'
      })
    }

    if (!['User', 'Pharmacy'].includes(role)) {
      return res.status(400).json({
        message: 'Invalid role.'
      })
    }

    if (role === 'User' && (!firstName || !lastName)) {
      return res.status(400).json({
        message: 'First name and last name are required for users.'
      })
    }

    if (role === 'Pharmacy' && (!pharmacyName || !location || !phone)) {
      return res.status(400).json({
        message:
          'Pharmacy name, location, and phone are required for pharmacy accounts.'
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters.'
      })
    }

    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      hashedPassword: await bcrypt.hash(password, 12),
      role
    })

    if (role === 'Pharmacy') {
      await Pharmacy.create({
        name: pharmacyName,
        location,
        phone,
        owner: user._id
      })
    }

    const { _id, createdAt, updatedAt } = user

    return res.status(201).json({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      _id,
      createdAt,
      updatedAt
    })
  } catch (err) {
    console.error(err)

    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message
      })
    }

    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Username or email already exists'
      })
    }

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function signIn(req, res) {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required.'
      })
    }

    const user = await User.findOne({
      username: username.toLowerCase().trim()
    })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials.'
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword
    )

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid credentials.'
      })
    }

    // Construct the JWT payload
    const payload = {
      username: user.username,
      _id: user._id,
      role: user.role
    }

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    return res.status(200).json({
      accessToken,
      user: {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

async function verifyUser(req, res) {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        message: 'User not found.'
      })
    }

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = {
  signUp,
  signIn,
  verifyUser
}
