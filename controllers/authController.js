const User = require("../models/User")

// SIGN UP - CREATE USER
//----------------------------------------------------------------------------
const createUser = async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(422).json({ error: "All fields are required" })
  }

  try {
    const userAlreadyExists = await User.findOne({ email })

    if (userAlreadyExists) {
      return res.status(422).json({ error: "Email already registered" })
    }

    const newUser = await User.create({ email, password, name })

    return res.status(201).json(newUser)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = { createUser }
