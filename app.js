const  express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const errorhandler = require('errorhandler');
const passport = require('passport');

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/test-api', (err) => {
    if(err) {
        return console.log('unable to connect to DB');
    }
    console.log('Connected to DB succesfully');
});


require('./models/user');
require('./models/article');
require('./config/passport');

app.use(require('./router'));


app.use(errorhandler());

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
});

app.listen( port, function(){
    console.log('Listening on port ', port );
});
  