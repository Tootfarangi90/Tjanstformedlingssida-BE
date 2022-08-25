const express = require('express')
const routes = require('./routes/user.js')
var favicon = require('serve-favicon')
var path = require('path')

const app = express()
app.use(express.json())
app.use('/user', routes)
app.use(favicon(path.join(__dirname, 'public', 'Rocket-icon.ico')))

app.get("/", (req, res) => {
    headers={"cache-control": "no-cache"}
    body={"status": "available"}
    res.status(200).json(body)
})


app.listen(8080, () => {
    console.log('Port 8080 ready')
})

