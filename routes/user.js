const express = require("express")
const router = express.Router({})

let users = []

router.post('/register', (req, res, next) => {

    const date = new Date()

    newUser = {
        email: req.body.email,
        password: req.body.password,
        userCreated: date
    }
    users.push(newUser)
    res.status(200).send(users)
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

router.get('/getusers', (req, res) => {
    res.status(200).json(users)
})

module.exports = router;