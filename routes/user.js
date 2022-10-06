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
        res.status(400).send({ message: "Alla fält är obligatoriska!" });
        return
        }

        if(checkEmail) {
            res.status(409).send({message: "Emailadressen finns redan, var vänlig att logga in!"});
            return;
        }

        if(checkUsername) {
            res.status(409).send({message: "Användarnamnet finns redan, var vänlig att logga in!"});
            return;
        }

        await bcrypt.genSalt(10, (error, salt) => {
             bcrypt.hash(password, salt).then((hash) => {
                userSchema.create({
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    email: email,
                    password: hash,
                    creationDate: Date.now()
                })
                res.json({message: "Användare registrerad!"})

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
        
        
        if(!(email && password)) {
            res.status(400).json({message: "Alla fält är obligatoriska!"})
            return
        }

        if(!user) {
            res.status(404).json({message: "Användare finns inte, var vänlig försök igen!"})
            return
        }

        const dbPassword = user.password
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
                
                res.json({message: "Välkommen", user: token})
                return
            } else {
                res.status(401).json({message: "Lösenordet är inkorrekt!"})
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


router.patch('/advertisment/:id', async (request, response) =>{
    const {category, title, description, price} = request.body;
    
    if (!(category && title && description && price)){
        response.status(400).send({ message: "Alla fält är obligatoriska!" });
        return
        }
    else{
        try{
            await userSchema.updateOne({_id: request.params.id},{$push:{advertisment: request.body}});
            response.json('Tjänsten är utannonserad!');
            console.log(request.params.id)
        }
        catch (error){
            console.log(error)
        };
    }
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