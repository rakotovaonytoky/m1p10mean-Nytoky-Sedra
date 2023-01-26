var express = require('express');
var router = express.Router();
const DepotController=require("../controller/depot.controller");

router.post("/carDepot",DepotController.DoDepot);
router.get("/carInDepot", DepotController.findDepotWaitValidationApi);
router.get("/depot/:idDepot", DepotController.findDepotById);
router.get("/carWaitReparation", DepotController.findDepotWaitReparationApi);
router.get("/carWaitReparation", DepotController.findDepotWaitReparationApi);
router.get("/carReparationProgress", DepotController.findDepotReparationProgressApi);
router.get("/carReparationDone", DepotController.findDepotReparationDoneApi);
router.get("/carReparationCheckoutDone", DepotController.findDepotCheckoutApi);

router.get("/:idUser/UserDepot", DepotController.findDepotByUserApi);
router.get("/:idUser/CarUnDepot", DepotController.findepotByUserUnDepot);
router.get("/:idUser/carWaitValidation", DepotController.findepotByUserWaitValidation);
router.get("/:idUser/carReparationProgress", DepotController.findepotByUserReparationProgress);
router.get("/:idUser/carReparationDone", DepotController.findepotByUserReparationDone);
module.exports = router;