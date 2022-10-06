const express = require("express")
const router = express.Router({})
const userSchema = require('../mongooseSchema/userSchema')
const jwt = require("jsonwebtoken")
require('dotenv').config()

const bcrypt = require('bcrypt')


router.get('/getusers', (request, response) =>{
    
    userSchema.find()
    .then(data => {
        response.json({users:data.length, data})
    })
    .catch(error => response.json(error));
    console.log("error")
});



router.post('/register', async (req, res, next) => {

    try {
        const {firstname, lastname, email, password, username} = req.body;
        const checkEmail = await userSchema.findOne({ email });
        const checkUsername = await userSchema.findOne({ username });
        
        
        
        if (!(firstname && lastname && email && password && username)){
        res.status(400).send({ message: "All inputs are required" });
        return
        }

        if(checkEmail) {
            res.status(409).send({message: "Email exists, please login"});
            return;
        }

        if(checkUsername) {
            res.status(409).send({message: "Username already exists, please login"});
            return;
        }

        await bcrypt.genSalt(10, (error, salt) => {
             bcrypt.hash(password, salt).then((hash) => {
                userSchema.create({
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    email: email,
                    password: hash
                })
                res.json({message: "User registered"})

            }).catch((error) => {
                console.log("salt error:" + error)
            })
    })


    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
        return;
    };
});



router.post('/login', async (req,res, next) => {

    try {
        const { email, password } = req.body
        const user = await userSchema.findOne({email})
        const dbPassword = user.password
        
        
        if(!(email && password)) {
            res.status(400).json({message: "All inputs are required"})
            return
        }

        if(!user) {
            res.status(404).json({message: "User not found"})
            return
        }


        await bcrypt.compare(password, dbPassword)
        .then((userMatched) => {
            if(userMatched) {
            
                const token = jwt.sign({
                    email: req.body.email,
                    password: req.body.password
                },
                process.env.JWT_SECRET)

                /*
                res.cookie("access-token", token, {
                    maxAge: 3600000
                })
                */

                console.log(token)
                
                res.json({message: "Welcome", user: token})
                return
            } else {
                res.status(401).json({message: "Invalid password"})
            }
        }).catch((error) => {
            console.log("compare error:" + error)
        })

    
    } catch (error) {
        console.log('Error reason: ' + error)
        res.status(500).send({ error, user: false });
        return 
    }
})


router.patch("/advertisment/:id", async (request, response) =>{
    console.log(request.body)
    try{
        await userSchema.updateOne({_id: request.params.id},{$push:{advertisment: request.body}});
        response.json('Advertisment added')
        console.log(request.params.id)
    }
    catch (error){
        console.log(error)
    };
})


router.get('/getusers/:id', async (req, res) => {

    try {
        const userFound = await userSchema.findOne({ _id: req.params.id })
        return res.status(200).json(userFound)
      } catch(err) {
        console.log(err)
      }
});


module.exports = router;