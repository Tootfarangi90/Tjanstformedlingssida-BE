const mongoose = require('mongoose')
require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT || 8080

mongoose.connect(process.env.DATABASE_URL, () => {
    console.log("Database is connected")
})





app.listen(PORT, () => {
    console.log(`Port ${PORT} ready`)
})