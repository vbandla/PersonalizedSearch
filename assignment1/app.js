// loading the required modules for the app

var passwdEncrypt = require('bcryptjs');
var parser = require('body-parser');
var flashMessages = require('connect-flash');
var cookieParser = require('cookie-parser' );
var express = require('express');
var handleBars = require('express-handlebars');
var expressMessages = require('express-messages');
var session = require('express-session');
var expressValidator = require('express-validator');
var mongoDB = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var passportHTTP = require('passport-http');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');


// connecting to the database
var db = mongoose.connect('mongodb://localhost/assignment1', function(err) {
    if (err) throw err;
});


// routes for home page, profile page, login, signup pages

var authPage = require('./routes/auth');
var profilePage = require('./routes/users');





// Initializing app
var app = express();

//app.use();

//view engine for the app and registering handlebars for view engine

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handleBars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: false }))

// parse application/json
app.use(parser.json())

app.use(parser.text());

app.use(flashMessages());

app.use(cookieParser());


//static files path
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
    secret: 'sdvseeq3t43dvfdabq353r',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));


// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// res.locals let's any view use the variables 
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });


  app.use('/', authPage);
 

  app.use('/users', profilePage);

  
  app.set('port', 8080);
  app.listen(app.get('port'));