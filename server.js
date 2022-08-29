const express = require('express')
const routes = require('./routes/user.js')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())
app.use('/user', routes)

app.get("/", (req, res) => {
    headers={"cache-control": "no-cache"}
    body={"status": "available"}
    res.status(200).json(body)
})


app.listen(8080, () => {
    console.log('Port 8080 ready')
})