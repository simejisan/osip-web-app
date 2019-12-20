const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const morgan = require('morgan');
require('dotenv').config()
const db = require("./database/database");

// Create Redis
const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_URL);

const app = express();

// Routers
const users = require('./routers/users');
const functions = require('./routers/functions');
const roles = require('./routers/roles');
const hotwordsAPI = require('./routers/hotwords');
const promotionsAPI = require('./routers/promotions');
const flashsaleAPI = require('./routers/flashsale');
const favoritesAPI = require('./routers/favorites');
const suggestAPI = require('./routers/suggest');
const emailAPI = require('./routers/email');

// wake up dyno heroku
const wakeupDyno = require('./utils/wakeup-dyno');

app.use(morgan("dev"));

// Enable CORS
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static('./dist'));

// Setting API Router
app.get('/', (req, res) => res.sendFile("index.html"));
// Router user
app.use('/users', users);
// Router function
app.use('/functions', functions);
// Router Roles
app.use('/roles', roles);
// Router hotwords
app.use('/api/hotwords', hotwordsAPI);
// Router promotions
app.use('/api/promotions', promotionsAPI);
// Router flash sales
app.use('/api/flashsale', flashsaleAPI);
// Router suggest words
app.use('/api/suggests', suggestAPI);
// Router for favorite
app.use('/api/favorites', favoritesAPI);
// Router for sendEmail and checkEmail
app.use('/email', emailAPI);

redisClient.on('connect', () => {
    console.log("Connected to Redis");
})

redisClient.on('error', err => {
    console.log('Error: ${err}');
})

db.connect()
    .then((msg) => {

        console.log("Connect to database successful");

        app.listen(process.env.PORT, (err) => {
            wakeupDyno(process.env.DYNO_URL);

            if (err) throw err;
            console.log("Server is running on port: ", process.env.PORT);
        });

    }).catch((err) => {
        console.log("Error connect Database: ", err);
    })

module.exports = app;
