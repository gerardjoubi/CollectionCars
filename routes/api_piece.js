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
//--------------Get user Details----------
router.get("/user_page/:id",(req,res,next)=>{
  console.log(req.params.id)
  userModel.findById(req.params.id)
  .then (userDoc =>{
    console.log(userDoc);
    res.render("user_page.hbs",{ userDoc })
  })
  .catch(err => next(err))
});
//--------------Get Piece data----------
router.get("/dashboard_piece",(req,res,next)=>{
  pieceModel.find()
  .then (pieceData =>{
    console.log(pieceData);
    res.render("dashboard_piece.hbs",{ pieceData })
  })
  .catch(err => next(err))
});

module.exports = router;