const express = require("express")
const router = express.Router({})
const userSchema = require('../mongooseSchema/userSchema')

router.post('/register', async (req, res, next) => {


    const newUser = new userSchema({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        occupation: req.body.occupation,
    })

    const findUser = await userSchema.findOne({email: req.body.email})
        
        if (findUser) {
            res.json('Email already exists')

        } else {
            res.json('Succeeded')
            newUser.save()
            console.log(req.body)
        }

})



router.get('/getusers', (request, response) =>{

    userSchema.find()
    .then(data => {
        console.log(data)
        response.json(data)
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
    const user = await users.findOne({email})
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