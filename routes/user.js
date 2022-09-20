const express = require("express")
const router = express.Router({})
const userSchema = require('../mongooseSchema/userSchema')



router.post('/register', async (req, res, next) => {

    try {
        const {firstname, lastname, email, password, occupation} = req.body
        const checkEmail = await userSchema.findOne({ email })
        console.log(req.body)
        
        if (!(firstname && lastname && email && password && occupation)){
        res.status(400).send({ message: "All inputs are required" })
        return   
        }

        if(checkEmail) {
            res.status(409).send({message: "User already exists, please login"})
            return
        }

        const newUser = await userSchema.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            occupation: occupation
        })
        res.json({status: 200, message : "User was registered successfully"})
        return 

    } catch (error) {
        console.log('Error Register: ' + error)
        res.json({ status: 500, message: error })
        return   
    }

})



router.get('/getusers', (request, response) =>{
    
    userSchema.find()
    .then(data => {
        response.json({ status: 200, message: data})
    })
    .catch(error => response.json(error))
    
})




router.post('/login', async (req,res, next) => {

    try {
        const { email, password } = req.body
        console.log(req.body)

        if(!(email && password)) {
            res.status(400).json({message: "All inputs are required"})
            return
        }
        const user = await userSchema.findOne({email})
        console.log(user)
        console.log(user.email)
        if(!email) {
            res.json({status: 404, message: "user not found"})
            return
        }
        console.log(user.password)

        const passwordValidation = await password === user.password
        if(!passwordValidation) {
            res.json({status: 401, message: "Invalid password"})
            return
        }    
        if(user && passwordValidation) {
            res.json({status: 200, message: "Welcome"})
            return
        }
    
    } catch (error) {
        console.log('Error reason: ' + error)
        res.json({message: error})
        return 
    }

})


module.exports = router;