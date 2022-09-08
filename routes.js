const express = require ('express');
const router = express.Router();



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
 * /get:
 *  get:
 *    description: Use to get all users
 *    responses:
 *      '200':
 *        description: Got all users
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
 *    responses:
 *      '201':
 *        description: New user created
 */
router.post("/createUser", async (req, res) => {
    const user = {
     email: req.body.email,
     password: req.body.password
    }
    users.push(user)
    res.status(201).json(user)
   })


module.exports = router;