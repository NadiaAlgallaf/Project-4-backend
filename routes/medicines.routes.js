const router = require("express").Router();

const medicinesController = require("../controllers/medicines.controller");

router.get("/", medicinesController.getAllMedicines);

module.exports = router;