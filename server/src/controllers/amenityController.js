import Amenity from "../models/amenityModel.js";

// Create amenity Type (Super Admin Only)
export const createAmenity = async (req, res) => {
  const { amenityName, colorCode } = req.body;

  // Log the request body for debugging
  console.log("Request Body:", req.body);

  // Check if required fields are present
  if (!amenityName || !colorCode) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newAmenity = new Amenity({
      amenityName,
      colorCode,
    });

    const savedAmenity = await newAmenity.save();
    res.status(201).json(savedAmenity);
  } catch (error) {
    console.error("Error creating amenity type:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get All amenity Types
export const getAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.find({ isDeleted: false });
    res.status(200).json(amenity);
  } catch (error) {
    console.error("Error fetching amenity types:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete amenity Type (Super Admin Only)
export const deleteAmenity = async (req, res) => {
  const { id } = req.params;

  try {
    const amenity = await Amenity.findById(id);

    if (!amenity) {
      return res.status(404).json({ message: "amenity type not found" });
    }

    // Soft delete the amenity type
    amenity.isDeleted = true;
    await amenity.save();

    res.status(200).json({ message: "Amenity type deleted successfully" });
  } catch (error) {
    console.error("Error deleting amenity type:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
