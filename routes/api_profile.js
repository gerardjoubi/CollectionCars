const express = require("express");
const profileRoute = express.Router();
const secure = require("connect-ensure-login");
const userModel = require("./../models/users");
const carModel = require("./../models/car");
const pieceModel = require("./../models/piece");
//--------------Get user Details----------

profileRoute.get("/user_page", secure.ensureLoggedIn(), (req, res, next) => {
  userModel
    .findById(req.user._id)
    .then(userDoc => {
      console.log(userDoc);
      carModel.find({ ownerId: userDoc._id }).then(cars => {
        console.log(cars);
        pieceModel.find({ ownerId: userDoc._id }).then(pieces => {
          console.log(pieces);
          res.render("user_page.hbs", { userDoc, cars, pieces });
        });
      });
    })
    .catch(err => next(err));
});

module.exports = profileRoute;
