const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'SmartBrainDB'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('you have found the server congrats..'))
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))
app.put('/image', (req, res) => image.handleImage(req, res, db))
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
app.get('/profile/:userID', (req, res) => profile.handleProfileGet(req, res, db))

app.listen(3000, () => console.log('server is listening on http://localhost:3000'))