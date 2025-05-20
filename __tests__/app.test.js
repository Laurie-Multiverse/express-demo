const { describe, test, expect } = require("@jest/globals")
const request = require("supertest")
const app = require("../src/app")

describe("CRUD tests for User", () => {

    test("post a new user", async () => {
        const newUser = {
            username: "maggie",
            email: "maggie@myhouse.com",
            password: "dog123"
        }
        const response = await request(app)
            .post("/users")
            .send(newUser);
        expect(response.statusCode).toEqual(201)
        expect(response.body.username).toEqual("maggie");
        expect(response.body).toEqual(expect.objectContaining(newUser));
    })

})