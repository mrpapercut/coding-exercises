const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('dist'));

app.get('/', (req, res) => {
    const htmlfile = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

    res.send(htmlfile);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
