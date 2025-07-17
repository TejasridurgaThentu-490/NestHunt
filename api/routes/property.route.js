import express from "express";
import Property from "../models/property.model.js";

const router = express.Router();

// POST: Add a new property
router.post("/", async (req, res) => {
  try {
    const { name, location, price, description } = req.body;

    const newProperty = new Property({
      name,
      location,
      price,
      description,
    });

    await newProperty.save();
    res.status(201).json({ success: true, property: newProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding property" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { location } = req.query;
    let query = {};

    if (location) {
      query.location = { $regex: new RegExp(location, "i") }; // Case-insensitive match
    }

    const properties = await Property.find(query);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching properties" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ success: false, message: "Error fetching property details" });
  }
});




export default router;
