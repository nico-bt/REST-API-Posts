const express = require("express")
const router = express.Router()
const { createUser } = require("../controllers/authController")

// Sign Up --> POST /auth/sign-up
//---------------------------------------------------
router.post("/sign-up", createUser)

module.exports = router
