import Property from "../models/propertyModel.js";
import Amenity from "../models/amenityModel.js";

// Create a new property
export const createProperty = async (req, res) => {
  try {
    const {
      propertyType,
      propertyName,
      address,
      location,
      area,
      rentAmount,
      depositAmount,
      leaseTerm,
      owner,
    } = req.body;

    if (
      !propertyType ||
      !propertyName ||
      !address ||
      !location ||
      !area ||
      !rentAmount ||
      !depositAmount ||
      !leaseTerm ||
      !owner
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(500).json({ message: "Error creating property", error });
  }
};

// Get all properties with aggregation and pagination
export const getProperties = async (req, res) => {
  const { page = 1, limit = 10, propertyType, status } = req.query;
  const match = { isDeleted: false };

  if (propertyType) match.propertyType = propertyType;
  if (status) match.status = status;

  try {
    const properties = await Property.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "amenities", // The collection name for Amenity
          localField: "amenities",
          foreignField: "_id",
          as: "amenitiesList",
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
      { $sort: { createdAt: -1 } },
    ]);

    const totalProperties = await Property.countDocuments(match);

    res.status(200).json({
      total: totalProperties,
      pages: Math.ceil(totalProperties / limit),
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
};

// Update a property
export const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      req.body,
      { new: true }
    );
    if (!updatedProperty)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Error updating property", error });
  }
};

// Delete (soft delete) a property
export const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findByIdAndUpdate(
      propertyId,
      { isDeleted: true },
      { new: true }
    );
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ message: "Property deleted", property });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
};
