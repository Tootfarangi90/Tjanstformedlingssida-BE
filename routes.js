const express = require ('express');
const router = express.Router();


let users = []


router.get("/get", (req, res) => {
    headers={"cache-control": "no-cache"}
    body={users}
    res.status(200).json(body)
})


router.post("/createUser", async (req, res) => {
    const user = {
     email: req.body.email,
     password: req.body.password
    }
    users.push(user)
    res.status(201).json(user)
   })


module.exports = router;