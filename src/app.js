const express = require("express")
const app = express();

// add all my callbacks

app.use("/static", express.static("public"))

app.use("/", (req, res) => {
    const msg = `this was a ${req.method} request`
    res.send(msg)
})

module.exports = app;