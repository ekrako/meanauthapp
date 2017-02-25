const express= require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected', ()=> {
  console.log('Connected to db ' + config.database);
});
// on db connection error
mongoose.connection.on('error', (err)=> {
  console.log('Faild to coonect to db: ' + err);
});

const app = express();

const users = require('./routes/users');
// API port
const port = 3000;
//cors Middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname,'public')));
//body parser Middleware
app.use(bodyParser.json());

//passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require ('./config/passport')(passport);
app.use('/users',users);
// index Route
app.get('/',(req,res) => {
  res.send('Invalid Endpoint');
});
// Start server
app.listen(port, () => {
  var date = new Date();
  console.log(date+' | Server started on port '+port);
});
