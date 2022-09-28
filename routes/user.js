const express = require("express")
const router = express.Router({})
const userSchema = require('../mongooseSchema/userSchema')



router.get('/getusers', (request, response) =>{
    
    userSchema.find()
    .then(data => {
        response.json({users:data.length, data})
    })
    .catch(error => response.json(error));
});



router.post('/register', async (req, res, next) => {

    try {
        const {firstname, lastname, email, password, occupation} = req.body;
        const checkEmail = await userSchema.findOne({ email });
        
        
        
        if (!(firstname && lastname && email && password && occupation)){
        res.status(400).send({ message: "All inputs are required" });
        return;
        };

        if(checkEmail) {
            res.status(409).send({message: "User already exists, please login"});
            return;
        };

        const newUser = await userSchema.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            occupation: occupation
        });

        res.json({status: 200, message : "User was registered successfully"});
        return;

    } catch (error) {
        console.log('Error in user registration: ' + error);
        res.status(500).send({ error });
        return;
    };
});



router.post('/login', async (req,res, next) => {

    try {
        const { email, password } = req.body
        
        
        if(!(email && password)) {
            res.status(400).json({message: "All inputs are required"})
            return
        }

        const user = await userSchema.findOne({email})
        console.log(user)
        if(!user) {
            res.status(404).json({message: "User not found"})
            return
        }

        const passwordValidation = password === user.password
        if(!passwordValidation) {
            res.status(401).json({message: "Invalid password"})
            return
        }

        if(user.email && passwordValidation) {
            res.json({message: "Welcome"})
            return
        }
    
    } catch (error) {
        console.log('Error reason: ' + error)
        res.status(500).send({ error });
        return 
    }
})


module.exports = router;