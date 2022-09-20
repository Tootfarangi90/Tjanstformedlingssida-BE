const mongoose = require('mongoose')
require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT || 8080
const JEST_WORKER_ID = process.env.JEST_WORKER_ID

mongoose.connect(process.env.DATABASE_URL)
   .then(() => {
    console.log("Database is connected")
   })
   .catch((error) => {
    console.log(error)
   })


   if(JEST_WORKER_ID === undefined){
    app.listen(PORT, () => {
        console.log(`Port ${PORT} ready`)
    })
  }
