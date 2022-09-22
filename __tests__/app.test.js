/**
 * Unit test

@group unit

*/


const request = require ('supertest');
const app = require ("../app");
const mongoose = require('mongoose');
require('dotenv').config();
const { nanoid } = require ('nanoid');


const PORT = process.env.PORT || 8080



let server = null
beforeAll(() => {
    mongoose.connect(process.env.DATABASE_URL, () => {
        console.log("Database is connected");
    })
    server = app.listen(PORT, () => {
        console.log(`Port ${PORT} ready`);
    })
})


describe("Get all users", () => {
    test("Should respond with status code 200 and content-type JSON", async () => {
        const response = await request(app).get("/getusers");
        expect(response.statusCode).toEqual(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
});



describe ("User registration", () => {
    
    test("given all required fields are correct", async () => {
        
        const idLength = 6;
        
        const response = await request(app).post("/register").send({
            firstname: "supertest",
            lastname: "supertest",
            email: `${nanoid(idLength)}@test.com`,
            password: "test",
            occupation: "test"
        });
        expect(response.statusCode).toEqual(200);
        console.log(response.calls)
    });

    
    
    test("given email address is already in use", async () => {
        
        const response = await request(app).post("/register").send({
            firstname: "supertest",
            lastname: "supertest",
            email: "alreadyExistingEmail@test.com",
            password: "test",
            occupation: "test"
        });
        expect(response.statusCode).toEqual(409);
    });


    test("given a field has not been entered", async () => {
        
        const idLength = 6;

        const testData = [
            {
                firstname: undefined,
                lastname: "supertest",
                email: `${nanoid(idLength)}@test.com`,
                password: "test",
                occupation: "test"
            },
            {
                firstname: "supertest",
                lastname: undefined,
                email: `${nanoid(idLength)}@test.com`,
                password: "test",
                occupation: "test"
            },
            {
                firstname: "supertest",
                lastname: "supertest",
                email: undefined,
                password: "test",
                occupation: "test"
            },
            {
                firstname: "supertest",
                lastname: "supertest",
                email: `${nanoid(idLength)}@test.com`,
                password: undefined,
                occupation: "test"
            },
            {
                firstname: "supertest",
                lastname: "supertest",
                email: `${nanoid(idLength)}@test.com`,
                password: "test",
                occupation: undefined
            }
        ];
        for (data of testData){
            const response = await request(app).post("/register").send(data);
            expect(response.statusCode).toEqual(400);
        };
    });
});



afterAll( () => {
    mongoose.disconnect();
    server.close();
})