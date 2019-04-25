const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pieceSchema = new Schema(
  {
    pieceMarque: String,
    model: String,
    genre: String,
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

const Piece = mongoose.model("Piece", pieceSchema);

module.exports = Piece;
