const router = require("express").Router();

const pharmaciesController = require("../controllers/pharmacies.controller");

router.get("/", pharmaciesController.getAllPharmacies);

module.exports = router;