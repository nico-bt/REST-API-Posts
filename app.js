require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const isAuth = require("./middleware/isAuth")
const app = express()

app.use(express.json())

app.use("/posts", isAuth, require("./routes/postsRoutes"))
app.use("/auth", require("./routes/authRoutes"))

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    app.listen(process.env.PORT || 8080, () => {
      console.log("Running app...")
    })
  } catch (error) {
    console.log(error)
  }
}

main()
