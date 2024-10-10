// src/models/propertyTypeModel.js
import mongoose from "mongoose";

const propertyTypeSchema = new mongoose.Schema({
  propertyTypeName: {
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

const PropertyType = mongoose.model("PropertyType", propertyTypeSchema);
export default PropertyType;
