const { Client } = require('pg')
const dotenv = require('dotenv');
dotenv.config();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

module.exports = client