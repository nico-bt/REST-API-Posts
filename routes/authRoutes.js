const express = require("express")
const router = express.Router()
const { createUser, loginUser } = require("../controllers/authController")

// Sign Up --> POST /auth/sign-up
//---------------------------------------------------
router.post("/sign-up", createUser)

router.post("/login", loginUser)

module.exports = router
