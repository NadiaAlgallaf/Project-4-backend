const Pharmacy = require("../models/Pharmacy");

async function getAllPharmacies(req, res) {
  try {
    const pharmacies = await Pharmacy.find();

    return res.status(200).json(pharmacies);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function createPharmacy(req, res) {
  try {
    const { name, location, phone } = req.body;

    // Validation
    if (!name || !location || !phone) {
      return res.status(400).json({
        message: "Name, location, and phone are required.",
      });
    }

    const pharmacy = await Pharmacy.create({
      name,
      location,
      phone,
      owner: req.user._id,
    });

    return res.status(201).json(pharmacy);
  } catch (err) {
    console.error(err);

    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  getAllPharmacies,
   createPharmacy,
};