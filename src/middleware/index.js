function validatePassword(req, res, next) {
    const { password } = req.body;
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)/

    // DON'T DO THIS:
    // if (!password) {
    //     res.sendStatus(400).send("password required")
    // } 
    // next();

    if (!password) {
        res.sendStatus(400).send("password required")
    } else if (password.length < 8) {
        res.sendStatus(400).send("password must be at least 8 characters")
    } else if (!regex.test(password)) {
        res.sendStatus(400).send("password must have a number")
    } else {
        next();
    }
}

module.exports = { 
    validatePassword
}