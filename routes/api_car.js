const express = require("express");
const router = new express.Router();
const carModel = require("../models/car");
const userModel = require("../models/users");
const pieceModel = require("../models/piece");
// ------------------------------------------------------
// ------------------creat car-------------------
// router.get("/form_car",(req,res,next)=>{
//   res.render("form_car.hbs")
// });

router.post("/car", (req, res, next) => {
  // const {carModel, model,color,year,descriptif,imag}= req.body
  carModel
    .create(req.body)
    .then(carData => {
      res.locals.carData = carData;
      res.redirect("/user_page/" + carData.ownerId);
      console.log("CAR ADDED");
    })
    .catch(err => next(err));
});
//--------------Get user Details----------
router.get("/user_page/:id", (req, res, next) => {
  console.log(req.params.id);
  userModel
    .findById(req.params.id)
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

//--------------Get car data----------
router.get("/dashboard_car", (req, res, next) => {
  carModel
    .find()
    .then(carData => {
      console.log(carData);
      res.render("dashboard_car.hbs", { carData });
    })
    .catch(err => next(err));
});

router.get("/", (req, res, next) => {
  carModel
    .find()
    .then(carData => {
      console.log(carData);
      res.render("index.hbs", { carData });
    })
    .catch(err => next(err));
});
module.exports = router;
