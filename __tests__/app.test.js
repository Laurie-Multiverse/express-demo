const { describe, test, expect, beforeAll } = require("@jest/globals")
const request = require("supertest")
const app = require("../src/app")
const User = require("../src/models/User")

jest.mock("../src/models/User.js", () => ({
    create: jest.fn(),
    findOne: jest.fn(), // mock findOne for delete endpoint
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

    test("delete a user", async () => {
        // here we are expecting the endpoint to:
        // 1) find the user, given the username, using User.findOne
        // 2) destroy the user, using user.destroy
    
        // mock findOne to return a user
        const newUser = {
            username: "bunny",
            email: "rabbit@myyard.com",
            password: "bugs",
            id: 1,
            destroy: jest.fn()
        };
        User.findOne.mockResolvedValue(newUser);

        // mock the user instance destroy method
        newUser.destroy.mockResolvedValue(newUser);

        // send the delete request
        const response = await request(app)
            .delete(`/users/${newUser.username}`);

        // check the response
        expect(response.statusCode).toEqual(200);
        expect(response.body.username).toEqual(newUser.username);

        // check the calls to User.findOne
        expect(User.findOne).toHaveBeenCalledTimes(1);
        expect(User.findOne).toHaveBeenCalledWith({
            where: {
                username: newUser.username
            }
        });

        // check the calls to user.destroy
        expect(newUser.destroy).toHaveBeenCalledTimes(1);
        expect(newUser.destroy).toHaveBeenCalledWith();
    })

})