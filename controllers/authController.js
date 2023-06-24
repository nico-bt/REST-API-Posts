const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

// SIGN UP - CREATE USER
//----------------------------------------------------------------------------
const createUser = async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(422).json({ error: "All fields are required" })
  }

  if (!validator.isEmail(email)) {
    return res.status(422).json({ error: "Please enter a valid email" })
  }

  try {
    const userAlreadyExists = await User.findOne({ email })

    if (userAlreadyExists) {
      return res.status(422).json({ error: "Email already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ email, password: hashedPassword, name })

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    return res.status(201).json({ token, email: newUser.email, name: newUser.name })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = { createUser }
