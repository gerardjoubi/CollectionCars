// routes/auth-routes.js
const passport = require("passport");
const express = require("express");
const authRoutes = express.Router();
// /routes/auth-routes.js
const ensureLogin = require("connect-ensure-login");
//------
// User model
const User = require("../models/users");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  })
  .catch(error => {
    next(error)
  })
});
///define the routes and the corresponding functionality associated with each one------
authRoutes.get("/login", (req, res, next) => {
    res.render("auth/login");
  });
  
  authRoutes.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));
const router = require('./index.js')
  //------------corresponding functionality
//add the route------------
authRoutes.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("private", { user: req.user });
  });
  //-----logout 
  authRoutes.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });


  
module.exports = authRoutes;