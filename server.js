// Budget API

const express = require('express');
const data = require('./budget-data.json');
const cors = require('cors');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

app.use(cors());

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

const budget = data;

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});