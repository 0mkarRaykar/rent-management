import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema({
  amenityName: {
    type: String,
    required: true,
  },
  colorCode: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Amenity = mongoose.model("Anenity", amenitySchema);
export default Amenity;
