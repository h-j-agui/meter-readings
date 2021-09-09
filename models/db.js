const { Sequelize } = require('sequelize');
require('dotenv').config();


const db = new Sequelize(`postgres://${process.env.PASS}@localhost:5432/meter`);

module.exports = db;