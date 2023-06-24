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

// LOG IN User
//----------------------------------------------------------------------------
const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter all fields" })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: `${email} is not registered. Sign up first please.` })
    }
    // Check if passsword match with hashed password in DB
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(400).json({ error: "Wrong credentials" })
    }

    if (match) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
      res.json({ email: user.email, token })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = { createUser, loginUser }
