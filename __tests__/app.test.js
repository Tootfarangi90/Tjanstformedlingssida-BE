/**
 * Unit test

@group unit

*/


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


describe("Get all users", () => {
    test("Should respond with status code 200", async () => {
        const response = await request(app).get("/getusers")
        expect(response.statusCode).toEqual(200)
    })

    test("Should receive JSON in content-type header", async () => {
        const response = await request(app).get("/getusers")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

})



describe ("Register new user", () => {
    
    test("given all required fields are correct", async () => {
        
        const idLength = 6;
        
        const response = await request(app).post("/register").send({
            firstname: "supertest",
            lastname: "supertest",
            email: `${nanoid(idLength)}@test.com`,
            password: "test",
            occupation: "test"
        })
        expect(response.statusCode).toEqual(200)
    })

    
    
    test("given email address is already in use", async () => {
        
        const response = await request(app).post("/register").send({
            firstname: "supertest",
            lastname: "supertest",
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
            lastname: "supertest",
            email: `${nanoid(idLength)}@test.com`,
            password: "test",
            occupation: "test"
        })
        expect(response.statusCode).toEqual(400)
    })


    test("given no last name has been entered", async () => {
        
        const idLength = 6;

        const response = await request(app).post("/register").send({
            firstname: "supertest",
            lastname: undefined,
            email: `${nanoid(idLength)}@test.com`,
            password: "test",
            occupation: "test"
        })
        expect(response.statusCode).toEqual(400)
    })


    test("given no email has been entered", async () => {

        const response = await request(app).post("/register").send({
            firstname: "supertest",
            lastname: "supertest",
            email: undefined,
            password: "test",
            occupation: "test"
        })
        expect(response.statusCode).toEqual(400)
    })


    test("given no password has been entered", async () => {
        
        const idLength = 6;

        const response = await request(app).post("/register").send({
            firstname: "supertest",
            lastname: "supertest",
            email: `${nanoid(idLength)}@test.com`,
            password: undefined,
            occupation: "test"
        })
        expect(response.statusCode).toEqual(400)
    })


    test("given no occupation has been entered", async () => {
        
        const idLength = 6;

        const response = await request(app).post("/register").send({
            firstname: "supertest",
            lastname: "supertest",
            email: `${nanoid(idLength)}@test.com`,
            password: "test",
            occupation: undefined
        })
        expect(response.statusCode).toEqual(400)
    })
})



afterAll( () => {
    mongoose.disconnect()
    server.close()
})