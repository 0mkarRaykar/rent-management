import User from "../models/userModel.js";

// Fetch all users without password
export const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 1 }, { password: 0 }); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
