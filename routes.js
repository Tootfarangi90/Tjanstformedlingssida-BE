const { request } = require('express');
const express = require ('express');
const router = express.Router();
const { nanoid } = require ('nanoid')


const idLength = 6;



let users = []


/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       required: 
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: users email address
 *         password:
 *           type: string
 *           description: users password
 *       example:
 *         email: swagger@test.com
 *         password: safePassword
 */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: User database CRUD
  */



/**
 * @swagger
 * /get:
 *  get:
 *    description: Use to get all users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: Successfully fetched all users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/users'
 */
router.get("/get", (req, res) => {
    headers={"cache-control": "no-cache"}
    body={users}
    res.status(200).json(body)
})


/**
 * @swagger
 * /createUser:
 *  post:
 *    description: Use to register a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/users'
 *    responses:
 *      201:
 *        description: New user created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/users'
 *      500:
 *        description: Some server error
 */         
router.post("/createUser", async (req, res) => {
    
    try{
        const user = {
            id: nanoid(idLength),
            email: req.body.email,
            password: req.body.password
           }
           users.push(user)
           res.status(201).json(user)
    }
    catch{
        return res.status(500).send(error)
    }
   })



/**
 * @swagger
 * /users/{id}:
 *  put:
 *    description: Use for finding and replacing a user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/users'
 *    responses:
 *      201:
 *        description: User updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/users'
 *      404:
 *        description: User not found
 *      500:
 *        description: Some server error
 */     


router.put("/users/:id", async (req, res) => {
    
    try{
        const foundUserIndex = users.findIndex(result => result.id === req.params.id)
        console.log(foundUserIndex)
        
        if (foundUserIndex !== -1){
            const updatedUser = req.body
            updatedUser.id = nanoid(idLength)
            users[foundUserIndex] = updatedUser
            res.status(201).json(users)
        }else{
            res.status(404).json('User not found')
        }
    }
    catch(error){
        return res.status(500).send(error)
    }
})


/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    description: Use for deleting a user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User id
 *    responses:
 *      201:
 *        description: User deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/users'
 *      404:
 *        description: User not found
 *      500:
 *        description: Some server error
 */ 


router.delete("/users/:id", async (req, res) => {
    
    try{
        const foundUserIndex = users.findIndex(result => result.id === req.params.id)
        
        if (foundUserIndex !== -1){
            users.splice(foundUserIndex, 1)
            res.status(201).json(`User with id: '${req.params.id}' deleted`)
        }else{
            res.status(404).json('User not found')
        }
    }
    catch(error){
        return res.status(500).send(error)
    }
})


module.exports = router;