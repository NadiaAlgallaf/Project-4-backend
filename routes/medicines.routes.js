const router = require("express").Router();
const authorizeRole = require("../middleware/authorizeRole")

const verifyToken = require("../middleware/verifyToken");
const medicinesController = require("../controllers/medicines.controller");

router.get("/", medicinesController.getAllMedicines)
router.get("/:id", medicinesController.getMedicineById)
router.post("/", verifyToken,authorizeRole("Pharmacy"), medicinesController.createMedicine)
router.patch("/:id", verifyToken,authorizeRole("Pharmacy"),medicinesController.updateMedicine)
router.delete("/:id",verifyToken,authorizeRole("Pharmacy"),medicinesController.deleteMedicine)

module.exports = router;