const express = require('express');
const cors = require('cors');
const authenticate = require('./middleware/auth');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8080;

const knex = require('knex')(require('../knexfile.js')["development"]);
const User = require('./models/User');

app.use(cors());
app.use(express.json());


// Create a new instance of the User class
const userModel = new User(knex);

// Registristation 
app.post('/user/register', async (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    try {
        await userModel.register(firstName, lastName, username, password);
        res.status(201).send('User has been registered!');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login
app.post('/user/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.login(username, password);
        const token = jwt.sign({ userId: user.id }, 'your_secret_key');
        res.json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/user/profile', authenticate, async (req, res) => {
    res.send('Welcome to your profile');
});

app.get('/', (req, res) => {
    res.send('Application is running');
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});