const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const knex = require('knex')(require('../knexfile.js')["development"]);