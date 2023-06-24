require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()

app.use(express.json())

app.use("/posts", require("./routes/postsRoutes"))

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
