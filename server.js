const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const routes = require('./routes/user.js')


mongoose.connect('process.env.DATABASE_URL', () => {
    console.log("Database is connected")
})


app.use(cors())
app.use(express.json())
app.use('/', routes)

app.get("/", (req, res) => {
    headers={"cache-control": "no-cache"}
    body={"status": "available"}
    res.status(200).json(body)
})


app.listen(8080, () => {
    console.log('Port 8080 ready')
})

