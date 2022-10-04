const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstname: { type: String, required: true },
    lastname: { type: String, required: true }, 
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    advertisment: [ {type: String} ]
})

module.exports = mongoose.model("userV2", userSchema)