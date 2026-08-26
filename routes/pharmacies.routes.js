const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken")

const pharmaciesController = require("../controllers/pharmacies.controller")

router.get("/", pharmaciesController.getAllPharmacies)
router.get("/:id", pharmaciesController.getPharmacyById)
router.post("/", verifyToken, pharmaciesController.createPharmacy)
router.patch("/:id", verifyToken, pharmaciesController.updatePharmacy)
router.delete("/:id",verifyToken,pharmaciesController.deletePharmacy)



module.exports = router;