var express = require('express');
var router = express.Router();
const DepotController = require("../controller/depot.controller");
const { authJwt } = require("../middlewares/"); 

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
}
router.post("/carDepot",[authJwt.verifyToken],DepotController.DoDepot);
router.get("/carInDepot",[authJwt.verifyToken] ,DepotController.findDepotWaitValidationApi);
router.get("/depot/:idDepot", [authJwt.verifyToken],DepotController.findDepotById);
router.get("/carWaitReparation",[authJwt.verifyToken], DepotController.findDepotWaitReparationApi);
router.get("/carWaitReparation",[authJwt.verifyToken], DepotController.findDepotWaitReparationApi);
router.get("/carReparationProgress",[authJwt.verifyToken], DepotController.findDepotReparationProgressApi);
router.get("/carReparationDone",[authJwt.verifyToken], DepotController.findDepotReparationDoneApi);
router.get("/carReparationCheckoutDone",[authJwt.verifyToken], DepotController.findDepotCheckoutApi);

router.get("/:idUser/UserDepot",[authJwt.verifyToken], DepotController.findDepotByUserApi);
router.get("/:idUser/CarUnDepot",[authJwt.verifyToken], DepotController.findepotByUserUnDepot);
router.get("/:idUser/carWaitValidation",[authJwt.verifyToken], DepotController.findepotByUserWaitValidation);
router.get("/:idUser/carReparationProgress",[authJwt.verifyToken], DepotController.findepotByUserReparationProgress);
router.get("/:idUser/carReparationDone", [authJwt.verifyToken],DepotController.findepotByUserReparationDone);
module.exports = router;