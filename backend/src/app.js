const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const knex = require('knex')(require('../knexfile.js')["development"]);

app.use(cors());

app.get('/', (req, res) => {
    res.send('Application is running');
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});