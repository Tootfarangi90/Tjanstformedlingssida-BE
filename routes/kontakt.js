const express = require("express")
const router = express.Router()
const kontaktSchema = require("../mongooseSchema/kontaktSchema")


router.route("/messages")
.get((req,res)=>{
    kontaktSchema.find()
    .then(data => {
        response.json({users:data.length, data})
    })
    .catch(error => response.json(error));
    console.log("error")
})
.post(async(req,res)=>{
const {email, message} = req.body
const newMessage = await kontaktSchema.create({
    email:email,
    message:message
})

})

module.exports = router