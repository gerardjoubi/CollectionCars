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
      res.redirect("/user_page");
      console.log("CAR ADDED");
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

//----------- DELETE A car ------------
router.get("/delete/:id", (req, res, next) => {
  carModel
    .findByIdAndRemove(req.params.id)
    .then(profileDoc => {
      console.log("Car deleted");
      res.redirect("/user_page");
    })
    .catch(err => next(err));
});
module.exports = router;
