var express = require("express");
var router = express.Router();

var setorController = require("../controllers/setorController");

router.get("/", function(req, res) {
    setorController.testar(req, res);
});

router.get("/listar", function(req, res) {
    setorController.listar(req, res);
});

router.post("/cadastrar", function(req, res) {
    setorController.cadastrar(req, res);
})
  
module.exports = router;