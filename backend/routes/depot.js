var express = require('express');
var router = express.Router();
const DepotController=require("../controller/depot.controller");

router.post("/carDepot",DepotController.DoDepot);
router.get("/:idUser/Depot", DepotController.findDepotByUserApi);
router.get("/carInDepot", DepotController.findDepotWaitValidationApi);
module.exports = router;