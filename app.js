require('dotenv').config();
const flash = require("connect-flash");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const User = require("./models/users")
// app.js-----------------------------------
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
///--------------
//---

////---------------------------------
mongoose
  .connect('mongodb://localhost/collectionscars', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';




// Routes
const authRoutes = require("./routes/auth-routes");
app.use('/', authRoutes);
///////////////////
////app.use('/',apiCar);
//////////////////////////////
// configure the middleware-----------
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));
//----------------------------
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
/////Strategy - Defines which strategy we are going to use, and its configuration, that includes error control---------
passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));
//--------------------user serialize & user deserialize-----
// initialize passport and passport session--------------
app.use(passport.initialize());
app.use(passport.session());
//--------------------------------
app.use(flash());

passport.use(new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, next) => {

  User.findOne({ username }, (err, user) => {
    // ...
    authRoutes.get("/login", (req, res, next) => {
      res.render("auth/login");
    });

    authRoutes.post("/login", passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
      passReqToCallback: true
    }));
  })

}
));
// app.use("/api/car/", apiCar.router);
///failureFlash
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});
////

const index = require('./routes/index');
app.use('/', index);
const apiCar = require('./routes/api_car');
app.use('/', apiCar);
const apiPiece = require('./routes/api_piece');
app.use('/', apiPiece);

// const listener = app.listen(process.env.PORT, () => {
//   console.log("app started at http://localhost:" + listener.address().port);
// });

module.exports = app;
