const express = require("express");
const router = new express.Router();
const carModel = require("../models/car");
const userModel = require("../models/users");
const pieceModel = require("../models/piece");

const fileUploader = require("../config/cloudinaryConfig");
// ------------------------------------------------------
// ------------------creat car-------------------
// router.post("/car", (req, res, next) => {
//   console.log("add a car", req.body);
//   carModel
//     .create(req.body)
//     .then(carData => {
//       res.locals.carData = carData;
//       res.redirect("/user_page/");
//       console.log("car ADDED");
//     })
//     .catch(err => next(err));
// });
// router.get("/form_car",(req,res,next)=>{
//   res.render("form_car.hbs")
// });

router.post("/car", fileUploader.single("imag"), (req, res, next) => {
  const { carMarque, model, color, year, descriptif } = req.body;
  const imag = req.file ? req.file.secure_url : null;
  // return console.log("add a car", req.user._id);
  carModel
    .create({
      ownerId: req.user._id,
      carMarque,
      model,
      color,
      year,
      descriptif,
      imag
    })
    .then(carData => {
      console.log("success");
      res.locals.carData = carData;
      res.redirect("/user_page/");
      // console.log("Piece ADDED");
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
