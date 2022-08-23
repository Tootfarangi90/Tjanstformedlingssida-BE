const express = require('express');
const server = express();
server.use(express.json())

server.get("/", (req, res) => {
    headers={"cache-control": "no-cache"}
    body={"status": "its working"}
    res.status(200).json(body)
})


server.listen(8080, () => {
    console.log('Port 8080 ready')
})

