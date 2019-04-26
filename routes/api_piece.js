const express = require("express");
const router = new express.Router();
const pieceModel = require("../models/piece");
const fileUploader = require("../config/cloudinaryConfig");
const userModel = require("../models/users");

// ------------------------------------------------------
// creat piece
// -------------------------------------------------------

router.post("/piece", fileUploader.single("imag"), (req, res, next) => {
  const { pieceMarque, model, genre, year, descriptif } = req.body;
  const imag = req.file ? req.file.secure_url : null;
  // return console.log("add a car", req.user._id);
  pieceModel
    .create({
      ownerId: req.user._id,
      pieceMarque,
      model,
      genre,
      year,
      descriptif,
      imag
    })
    .then(pieceData => {
      console.log("success");
      res.locals.pieceData = pieceData;
      res.redirect("/user_page/");
      // console.log("Piece ADDED");
    })
    .catch(err => next(err));
});

//--------------Get piece data----------

router.get("/dashboard_piece", (req, res, next) => {
  pieceModel
    .find()
    .then(pieceData => {
      console.log("yo", pieceData);
      res.render("dashboard_piece.hbs", { pieceData });
    })
    .catch(err => next(err));
});

router.get("/", (req, res, next) => {
  pieceModel
    .find()
    .then(pieceData => {
      console.log(pieceData);
      res.render("index.hbs", { pieceData });
    })
    .catch(err => next(err));
});

//-------Delete a Piece--------
router.get("/deletePiece/:id", (req, res, next) => {
  pieceModel
    .findByIdAndRemove(req.params.id)
    .then(profileDoc => {
      console.log("Piece deleted");
      res.redirect("/user_page");
    })
    .catch(err => next(err));
});

module.exports = router;
