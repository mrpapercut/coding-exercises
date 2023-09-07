const express = require('express')
const { readFile } = require('fs/promises')
const port = 3000
const app = express()

/*
app.get('/', async (req, res) => {
    const indexhtml = await readFile('./web/index.html', 'utf8')

    res.send(indexhtml)
});
*/

app.use(express.static('web'))

app.listen(port, () => console.log(`Listening on port ${port}`))
