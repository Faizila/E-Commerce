// Dependencies
const express = require('express');
const routes = require('./routes');
const mysql = require('mysql2');
require('dotenv').config();

// import sequelize connection
const sequelize = require('./config/connection');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewware to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

