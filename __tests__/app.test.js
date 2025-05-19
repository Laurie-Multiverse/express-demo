const { describe, test, expect } = require("@jest/globals")
const request = require("supertest")
const app = require("../src/app")

describe("test our endpoints", () => {

    test("our static server", async () => {
        // 1. send a request to the static server
        const response = await request(app).get("/static/")

        // 2. make sure the request succeeds
        expect(response.statusCode).toEqual(200);
    })

    test("our dynamic method message", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual("this was a GET request")
    })


})