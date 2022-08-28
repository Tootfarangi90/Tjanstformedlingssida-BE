const express = require('express')
const routes = require('./routes/user.js')

const app = express()
app.use(express.json())
app.use('/', routes)

app.get("/", (req, res) => {
    headers={"cache-control": "no-cache"}
    body={"status": "available"}
    res.status(200).json(body)
})

app.listen(5000, () => {
    console.log('Port 5000 ready')
})

