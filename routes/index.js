const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});
//--------Creat a user ___________
router.get("/form_car",(req,res,next)=>{
  res.render("form_car.hbs")
});
router.post("/dashboard/car/",(req,res,next)=>{
  const {firstName, description}= req.body 
  Car.create(
    { firstName, description }
  )
  .then (carDoc =>{
    res.redirect("/names")
    console.log(carDoc)
  })
  .catch(err =>next(err))
});
//---------
module.exports = router;
