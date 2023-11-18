const fs = require('fs/promises');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', async (req, res) => {
    const filecontents = await fs.readFile('./index.html', 'utf8');

    res.send(filecontents);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
