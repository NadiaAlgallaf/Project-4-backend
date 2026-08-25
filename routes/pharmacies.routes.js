const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

const pharmaciesController = require("../controllers/pharmacies.controller");

router.get("/", pharmaciesController.getAllPharmacies);
router.post("/", verifyToken, pharmaciesController.createPharmacy);


module.exports = router;