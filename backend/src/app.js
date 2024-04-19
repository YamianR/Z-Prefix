const express = require('express');
const cors = require('cors');
const authenticate = require('./middleware/auth');
const jwt = require('jsonwebtoken');
const knex = require('knex')(require('../knexfile.js')["development"]);
const User = require('./models/User');
const Item = require('./models/Item');
const faker = require('faker');

const app = express();
const port = 8080;

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
        res.setHeader('Content-Type', 'application/json');
        res.json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/user/profile', authenticate, async (req, res) => {
    res.send('Welcome to your profile');
});


// Create a new instance of the Item class
const itemModel = new Item(knex);

// Create Item (POST)
app.post('/item', authenticate, async (req, res) => {
    const { itemName, description, quantity } = req.body;
    const userId = req.user.userId; // Get user ID from token
    try {
        await itemModel.create(userId, itemName, description, quantity);
        res.status(201).send('Item created successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get All Items (GET)
app.get('/items', async (req, res) => {
    try {
        const items = await itemModel.getAll();
        console.log('Items:', items); // Add this line for logging
        res.json(items);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Get Item by ID (GET)
app.get('/item/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        const item = await itemModel.getById(itemId);
        if (!item) {
            res.status(404).send('Item not found');
        } else {
            res.json(item);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Update Item (PUT)
app.put('/item/:id', authenticate, async (req, res) => {
    const itemId = req.params.id;
    const { itemName, description, quantity } = req.body;
    try {
        const item = await itemModel.getById(itemId);
        if (!item) {
            res.status(404).send('Item not found');
        } else {
            await itemModel.update(itemId, itemName, description, quantity);
            res.send('Item updated successfully');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Delete Item (DELETE)
app.delete('/item/:id', authenticate, async (req, res) => {
    const itemId = req.params.id;
    try {
        const item = await itemModel.getById(itemId);
        if (!item) {
            res.status(404).send('Item not found');
        } else {
            await itemModel.delete(itemId);
            res.send('Item deleted successfully');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


function generateComputerPart() {
    function generateEnglishSentence(length) {
        faker.locale = "en"; // Set Faker locale to English
        return faker.lorem.sentence();
    }

    const itemName = faker.random.arrayElement(["CPU", "GPU", "RAM", "Motherboard", "SSD", "HDD", "Power Supply", "Case", "Cooler"]);
    const description = generateEnglishSentence(30); // Adjust the desired length of the sentence here
    const quantity = faker.datatype.number({ min: 1, max: 20 });

    return {
        itemName,
        description,
        quantity
    };
}

app.post('/generate-computer-parts', authenticate, async (req, res) => {
    const userId = req.user.userId; // Get user ID from token
    try {
        for (let i = 0; i < 20; i++) {
            const { itemName, description, quantity } = generateComputerPart();
            await itemModel.create(userId, itemName, description, quantity);
        }
        res.status(201).send('Computer parts generated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Basic functionality of app
app.get('/', (req, res) => {
    res.send('Application is running');
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});