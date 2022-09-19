const request = require ('supertest');
const app = require ("../app")
const mongoose = require('mongoose')
require('dotenv').config()


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
    
    test("respond with 200", async () => {
        const response = await request(app).post("/register").send({
            firstname: "test@test.com",
            lastname: "test@test.com",
            email: "hej6@test.com",
            password: "test",
            occupation: "test"
        })
        expect(response.statusCode).toEqual(200)
    })
})



afterAll( () => {
    mongoose.disconnect()
    server.close()
})




