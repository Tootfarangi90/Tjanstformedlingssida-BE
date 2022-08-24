const express = require("express")
const router = express.Router({})

let users = {}

router.post('/register', (req, res, next) => {

const id = req.body.email
const today = new Date()

    users[id] = {
        id: req.body.email,
        email: req.body.email,
        password: req.body.password,
        date: today
    }

    res.status(200).send(users)
})

module.exports = router;