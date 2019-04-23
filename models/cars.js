const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const carSchema = new Schema({
  carMarque: String,
  model: String,
  color:String,
  year:Number,
  descriptif:String,
  imag:String
}, 
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;