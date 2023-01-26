var express = require('express');
var router = express.Router();
const EtatController=require("../controller/etat.controller");


router.post("/validateDepot/:idDepot",EtatController.ValidateDepot);
router.post("/reparer/:idDepot", EtatController.DoRepairs);
router.post("/terminer/:idDepot", EtatController.Terminer);
router.post("/facturer/:idDepot", EtatController.Facturer);
router.post("/finir/:idDepot", EtatController.EnFinir);


module.exports = router;