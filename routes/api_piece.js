const express = require("express");
const router = new express.Router();
const pieceModel = require("../models/piece");

// ------------------------------------------------------
// creat car
// -------------------------------------------------------

router.post("/piece", (req, res, next) => {
  pieceModel
    .create(req.body)
    .then(pieceData => {
      res.locals.pieceData = pieceData;
      res.redirect("/user_page/");
      console.log("Piece ADDED");
    })
    .catch(err => next(err));
});
//--------------Get piece data----------

router.get("/dashboard_piece", (req, res, next) => {
  pieceModel
    .find()
    .then(pieceData => {
      console.log(pieceData);
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
