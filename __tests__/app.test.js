const request = require ('supertest');
const app = require ("../app")
const mongoose = require('mongoose')
require('dotenv').config()
const { nanoid } = require ('nanoid')


const PORT = process.env.PORT || 8080



let server = null
beforeAll(() => {
    mongoose.connect(process.env.DATABASE_URL, () => {
        console.log("Database is connected")
    })
    server = app.listen(PORT, () => {
        console.log(`Port ${PORT} ready`)
    })
})



it("respond with 200", async () => {
    const response = await request(app).get("/getusers")
    expect(response.statusCode).toEqual(200)
})




describe ("Register new user", () => {
    
    test("given all required fields are correct", async () => {
        
        const idLength = 6;
        
        const response = await request(app).post("/register").send({
            firstname: "test@test.com",
            lastname: "test@test.com",
            email: `${nanoid(idLength)}@test.com`,
            password: "test",
            occupation: "test"
        })
        expect(response.statusCode).toEqual(200)
    })

    
    
    test("given email address is already in use", async () => {
        
        const response = await request(app).post("/register").send({
            firstname: "test@test.com",
            lastname: "test@test.com",
            email: "hej@test.com",
            password: "test",
            occupation: "test"
        })
        expect(response.statusCode).toEqual(409)
    })


    test("given no first name has been entered", async () => {
        
        const idLength = 6;

        const response = await request(app).post("/register").send({
            firstname: undefined,
            lastname: "test@test.com",
            email: `${nanoid(idLength)}@test.com`,
            password: "test",
            occupation: "test"
        })
        expect(response.statusCode).toEqual(400)
    })


})



afterAll( () => {
    mongoose.disconnect()
    server.close()
})




