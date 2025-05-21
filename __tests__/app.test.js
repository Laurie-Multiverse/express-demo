const { describe, test, expect, beforeAll } = require("@jest/globals")
const request = require("supertest")
const app = require("../src/app")
const User = require("../src/models/User")

jest.mock("../src/models/User.js", () => ({
    create: jest.fn()
}))

describe("CRUD tests for User", () => {

    beforeAll( () => {
        jest.clearAllMocks();
    })

    test("post a new user", async () => {
        // prepare the data
        const newUser = {
            username: "maggie",
            email: "maggie@myhouse.com",
            password: "dog123"
        }

        // mock out the database
        User.create.mockResolvedValue({...newUser, id: 1});

        // send the request
        const response = await request(app)
            .post("/users")
            .send(newUser);

        // make sure the response is correct
        expect(response.statusCode).toEqual(201)
        expect(response.body.username).toEqual("maggie");
        expect(response.body).toEqual(expect.objectContaining(newUser));

        // make sure we called the database right
        expect(User.create).toHaveBeenCalledWith(newUser);
        expect(User.create).toHaveBeenCalledTimes(1);
    })

    test("error posting user", async () => {
        User.create.mockRejectedValue(new Error("User creation failed"))
        const response = await request(app)
            .post("/users")
        expect(response.statusCode).toEqual(500);
    })

})