const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const medicinesController = require("../controllers/medicines.controller");

router.get("/", medicinesController.getAllMedicines);

router.post("/", verifyToken, medicinesController.createMedicine);

module.exports = router;