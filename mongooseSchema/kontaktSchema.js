const mongoose = require("mongoose")

const kontaktSchema = new mongoose.Schema({
    email: {type: String ,required: true},
    message : {type: String,required: true}
})

module.exports = mongoose.model("Kontakt",kontaktSchema)