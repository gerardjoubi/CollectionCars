const express = require("express");
const router = express.Router();
const carModel = require("../models/car");
/* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

router.get("/", (req, res, next) => {
  carModel
    .find()
    .then(carData => {
      console.log(carData, "car data aaaaaa");
      res.render("index.hbs", { carData });
    })
    .catch(err => next(err));
});

module.exports = router;
