var express = require('express');
var router = express.Router();
const DepotController=require("../controller/depot.controller");

router.post("/carDepot",DepotController.DoDepot);
router.get("/:idUser/UserDepot", DepotController.findDepotByUserApi);
router.get("/carInDepot", DepotController.findDepotWaitValidationApi);
router.get("/depot/:idDepot", DepotController.findDepotById);
module.exports = router;