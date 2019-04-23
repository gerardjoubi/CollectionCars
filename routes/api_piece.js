const express = require("express");
const router = new express.Router();
const pieceModel = require("../models/piece");

// ------------------------------------------------------
// creat car 
// -------------------------------------------------------

router.get("/form_piece",(req,res,next)=>{
  res.render("form_piece.hbs")
});

router.post("/piece",(req,res,next)=>{
  // const {carModel, model,color,year,descriptif,imag}= req.body 
  pieceModel.create(req.body)
  .then (carData =>{
    res.redirect("/")
    console.log(carData)
  })
  .catch(err =>next(err))
});

module.exports = router;