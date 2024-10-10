import PropertyType from "../models/propertyTypeModel.js";

// Create Property Type (Super Admin Only)
export const createPropertyType = async (req, res) => {
  const { propertyTypeName, colorCode } = req.body;

  // Log the request body for debugging
  console.log("Request Body:", req.body);

  // Check if required fields are present
  if (!propertyTypeName || !colorCode) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newPropertyType = new PropertyType({
      propertyTypeName,
      colorCode,
    });

    const savedPropertyType = await newPropertyType.save();
    res.status(201).json(savedPropertyType);
  } catch (error) {
    console.error("Error creating property type:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get All Property Types
export const getPropertyTypes = async (req, res) => {
  try {
    const propertyTypes = await PropertyType.find({ isDeleted: false });
    res.status(200).json(propertyTypes);
  } catch (error) {
    console.error("Error fetching property types:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Property Type (Super Admin Only)
export const deletePropertyType = async (req, res) => {
  const { id } = req.params;

  try {
    const propertyType = await PropertyType.findById(id);

    if (!propertyType) {
      return res.status(404).json({ message: "Property type not found" });
    }

    // Soft delete the property type
    propertyType.isDeleted = true;
    await propertyType.save();

    res.status(200).json({ message: "Property type deleted successfully" });
  } catch (error) {
    console.error("Error deleting property type:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
