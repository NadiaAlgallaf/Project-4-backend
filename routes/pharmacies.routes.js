const router = require("express").Router()

const authorizeRole = require("../middleware/authorizeRole")
const verifyToken = require("../middleware/verifyToken")

const pharmaciesController = require("../controllers/pharmacies.controller")

router.get("/", pharmaciesController.getAllPharmacies)

router.get("/:id", pharmaciesController.getPharmacyById)

router.post("/",verifyToken,authorizeRole("Pharmacy"),pharmaciesController.createPharmacy)

router.patch("/:id",verifyToken,authorizeRole("Pharmacy"),pharmaciesController.updatePharmacy)

router.delete( "/:id", verifyToken,authorizeRole("Pharmacy"),pharmaciesController.deletePharmacy)

module.exports = router