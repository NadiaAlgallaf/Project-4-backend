const Medicine = require("../models/Medicine");

async function getAllMedicines(req, res) {
  try {
    const medicines = await Medicine.find();

    return res.status(200).json(medicines);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function createMedicine(req, res) {
  try {
    const {
      name,
      dosage,
      category,
      price,
      requiresPrescription
    } = req.body;

    if (
      !name ||
      !dosage ||
      !category ||
      price === undefined ||
      requiresPrescription === undefined
    ) {
      return res.status(400).json({
        message:
          "Name, dosage, category, price, and prescription requirement are required.",
      });
    }

    const medicine = await Medicine.create({
      name,
      dosage,
      category,
      price,
      requiresPrescription,
    });

    return res.status(201).json(medicine);
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
  getAllMedicines,
  createMedicine,
};