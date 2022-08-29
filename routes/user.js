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

router.get('/getusers', (req, res) => {
    res.status(200).json(users)
})

module.exports = router;