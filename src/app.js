const express = require("express");
const User = require("./models/User");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();

// add all my callbacks

app.use(express.json())

// CRUD
// Create = POST
app.post("/users", async(req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch(error) {
        next(error);
    }
})


// Read = GET
// GET mysite.com/users
app.get("/users", async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
})

app.get("/users/:username", async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.params.username
            }
        });
        res.json(user);
    } catch (error) {
        next(error);
    }
})


// Update = PUT (PATCH)
// UPDATE mysite.com/users/username (provide body)
app.put("/users/:username", async(req, res, next) => {
    try {
        let user = await User.findOne({
            where: {
                username: req.params.username
            }
        });
        if (user) {
            user = await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).send("user not found")
        }
    } catch (error) {
        next(error);
    }
})



// Delete = DELETE
// DELETE mysite.com/users/badactor
app.delete("/users/:username", async (req, res, next) => {
    // alternative to finding user and user.destroy is
    // User.destroy(where)
    try {
        const user = await User.findOne({
            where: {
                username: req.params.username
            }
        });
        if (user) {
            const userDeleted = await user.destroy();
            res.json(userDeleted);
        } else {
            res.status(404).send("user not found")
        }
    } catch(error) {
        next(error);
    }
})


module.exports = app;