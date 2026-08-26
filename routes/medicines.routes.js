const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const medicinesController = require("../controllers/medicines.controller");

router.get("/", medicinesController.getAllMedicines)
router.get("/:id", medicinesController.getMedicineById)
router.post("/", verifyToken, medicinesController.createMedicine)
router.patch("/:id", verifyToken,medicinesController.updateMedicine)
router.delete("/:id",verifyToken,medicinesController.deleteMedicine)

module.exports = router;