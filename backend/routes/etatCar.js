var express = require('express');
var router = express.Router();
const EtatController=require("../controller/etat.controller");
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

router.post("/validateDepot/:idDepot",EtatController.ValidateDepot);
router.post("/reparer/:idDepot", EtatController.DoRepairs);
router.post("/terminer/:idDepot", EtatController.Terminer);
router.post("/facturer/:idDepot", EtatController.Facturer);
router.post("/finir/:idDepot", EtatController.EnFinir);


module.exports = router;