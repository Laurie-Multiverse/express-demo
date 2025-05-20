const app = require('./src/app')
const { db } = require('./db/connection')
const port = 3000

app.listen(port, async () => {
    await db.sync();
    console.log(`server is listening at ${port}`)
})