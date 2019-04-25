const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    carMarque: String,
    model: String,
    color: String,
    year: Number,
    descriptif: String,
    imag: {
      type: String,
      default:
        "https://res.cloudinary.com/dbqmymtv7/image/upload/c_scale,w_130/v1556189332/samples/animals/kitten-playing.gif"
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
