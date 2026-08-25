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

module.exports = {
  getAllPharmacies,
};