const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    category: {type: String ,required: true},
    title : {type: String,required: true},
    description: {type: String ,required: true},
    price: {type: Number, required: true},
})

module.exports = mongoose.model("Post", postSchema)