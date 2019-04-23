const express = require("express");
const router = new express.Router();
const carModel = require("../models/car");

// ------------------------------------------------------
// creat car 
// -------------------------------------------------------

router.get("/form_car",(req,res,next)=>{
  res.render("form_car.hbs")
});

router.post("/car",(req,res,next)=>{
  // const {carModel, model,color,year,descriptif,imag}= req.body 
  carModel.create(req.body)
  .then (carData =>{
    res.redirect("/")
    console.log(carData)
  })
  .catch(err =>next(err))
});

module.exports = router;