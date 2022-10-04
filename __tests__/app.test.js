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
    mongoose.connect(process.env.DATABASE_URL, () => {})
    .then(() => {
        console.log("Database is connected")
    })
    .catch((error) => {
        console.log(error)
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
            username: `${nanoid(idLength)}`,
            email: `${nanoid(idLength)}@test.com`,
            password: "test",
            advertisment: ["test"]
        });
        expect(response.statusCode).toEqual(200);
    });

    
    
    test("given email address is already in use", async () => {
        
        const idLength = 6;

        const response = await request(app).post("/register").send({
            firstname: "supertest",
            lastname: "supertest",
            username: `${nanoid(idLength)}`,
            email: "alreadyExistingEmail@test.com",
            password: "test",
            advertisment: ["test"]
        });
        expect(response.statusCode).toEqual(409);
    });


    test("given a field has not been entered", async () => {
        
        const idLength = 6;

        const testData = [
            {
                firstname: undefined,
                lastname: "supertest",
                username: `${nanoid(idLength)}`,
                email: `${nanoid(idLength)}@test.com`,
                password: "test",
                advertisment: ["test"]
            },
            {
                firstname: "supertest",
                lastname: undefined,
                username: `${nanoid(idLength)}`,
                email: `${nanoid(idLength)}@test.com`,
                password: "test",
                advertisment: ["test"]
            },
            {
                firstname: "supertest",
                lastname: "supertest",
                username: `${nanoid(idLength)}`,
                email: undefined,
                password: "test",
                advertisment: ["test"]
            },
            {
                firstname: "supertest",
                lastname: "supertest",
                username: `${nanoid(idLength)}`,
                email: `${nanoid(idLength)}@test.com`,
                password: undefined,
                advertisment: ["test"]
            }
        ];
        for (let data of testData){
            const response = await request(app).post("/register").send(data);
            expect(response.statusCode).toEqual(400);
        };
    });
});



describe ("Login", () => {
/*

    test("given login details are correct", async () => {
        
        const response = await request(app).post("/login").send({
            email: "alreadyExistingEmail@test.com",
            password: "test"
        });
        expect(response.statusCode).toEqual(200);
    });


    test("given a field has not been entered", async () => {
        
        const testData = [
            {
                email: undefined,
                password: "test"
            },
            {
                email: "alreadyExistingEmail@test.com",
                password: undefined
            }
        ];
        for (data of testData){
            const response = await request(app).post("/login").send(data);
            expect(response.statusCode).toEqual(400);
        };
    });


    test("given user does not exist", async () => {
        
        
        const response = await request(app).post("/login").send({
            email: "nonExistingEmail@test.com",
            password: "test"
        });
        expect(response.statusCode).toEqual(404);
    });
*/



    test("given password is invalid", async () => {
        
        const response = await request(app).post("/login").send({
            email: "alreadyExistingEmail@test.com",
            password: "invalidPassword"
        });
        expect(response.statusCode).toEqual(401);
    });
    
});



afterAll( () => {
    mongoose.disconnect();
    server.close();
})