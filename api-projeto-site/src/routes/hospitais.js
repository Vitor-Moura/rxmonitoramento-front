var express = require("express");
var router = express.Router();

var hospitalController = require("../controllers/hospitalController");

router.get("/", function(req, res) {
    hospitalController.testar(req, res);
});

router.get("/listar", function(req, res) {
    hospitalController.listar(req, res);
});

router.post("/cadastrar", function(req, res) {
    hospitalController.cadastrar(req, res);
})
  
module.exports = router;