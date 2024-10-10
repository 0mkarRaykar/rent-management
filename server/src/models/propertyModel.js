// src/models/propertyModel.js
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  propertyType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyType",
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  rentAmount: {
    type: Number,
    required: true,
  },
  depositAmount: {
    type: Number,
    required: true,
  },
  leaseStartDate: {
    type: Date,
    required: true,
  },
  leaseEndDate: {
    type: Date,
    required: true,
  },
  leaseRenewalDate: { type: Date },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["vacant", "occupied"],
    default: "vacant",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
