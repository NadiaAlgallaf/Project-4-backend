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

module.exports = {
  getAllMedicines,
};