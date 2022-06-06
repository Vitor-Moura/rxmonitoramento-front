var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/", function(req, res) {
    maquinaController.testar(req, res);
});

// FUNÇÃO LISTAR TODAS AS MAQUINAS CADASTRADAS
router.get("/listarTodas", function(req, res) {
    maquinaController.listarTodas(req, res);
});

// FUNÇÃO GRÁFICO 1 - CPU - LISTAR MÉDIA E PICOS DE TODAS AS MÁQUINAS
router.get("/listarUsoCPU", function(req, res) {
    maquinaController.listarUsoCPU(req, res);
});

// FUNÇÃO GRÁFICO 2 - MEMÓRIA - LISTAR MÉDIA E PICOS DE TODAS AS MÁQUINAS
router.get("/listarUsoMemoria", function(req, res) {
    maquinaController.listarUsoMemoria(req, res);
});

// FUNÇÃO ACOMPANHE EM TEMPO REAL - CPU, MEMEÓRIA E DISCO
router.get("/listarPorMaquina/:idMaquina", function(req, res) {
    maquinaController.listarPorMaquina(req, res);
});

// FUNÇÃO ACOMPANHE EM TEMPO REAL - CPU, MEMEÓRIA E DISCO
router.get("/listarProcessosCPU/:idMaquina", function(req, res) {
    maquinaController.listarProcessosCPU(req, res);
});

// FUNÇÃO 30 PROCESSOS CPU
router.get("/listarUsuarioMaquina/:idMaquina", function(req, res) {
    maquinaController.listarUsuarioMaquina(req, res);
});

// FUNÇÃO CADASTRAR MÁQUINA
router.post("/cadastrar", function(req, res) {
    maquinaController.cadastrar(req, res);
})

// FUNÇÃO EXCLUIR MÁQUINA
router.post("/excluir/:idMaquina", function(req, res) {
    maquinaController.excluir(req, res);
})

// FUNÇÃO ALTERAR MÁQUINA
router.post("/alterar", function(req, res) {
    maquinaController.alterar(req, res);
})

// FUNÇÃO ALTERAR MÁQUINA
router.get("/pesquisarMaquina/:idMaquina", function(req, res) {
    maquinaController.pesquisarMaquina(req, res);
});

// FUNÇÃO CARD1 - QUANTIDADE DE MAQUINAS DESLIGADAS
router.get("/qtdDesligado", function(req, res) {
    maquinaController.qtdDesligado(req, res);
});

// FUNÇÃO CARD1 - MOSTRAR MAQUINAS DESLIGADAS
router.get("/maquinasDesligadas", function(req, res) {
    maquinaController.maquinasDesligadas(req, res);
});

// FUNÇÃO CARD2 - QUANTIDADE DE MAQUINAS LIGADAS
router.get("/qtdLigado", function(req, res) {
    maquinaController.qtdLigado(req, res);
});

// FUNÇÃO CARD2 - MOSTRAR MAQUINAS LIGADAS
router.get("/maquinasLigadas", function(req, res) {
    maquinaController.maquinasLigadas(req, res);
});

// FUNÇÃO CARD3 - QUANTIDADE DE MAQUINAS COM CPU CRÍTICO
router.get("/qtdCriticoCPU", function(req, res) {
    maquinaController.qtdCriticoCPU(req, res);
});

// FUNÇÃO CARD3 - MOSTRAR MAQUINAS EM COM CPU CRÍTICO
router.get("/maquinasCriticoCPU", function(req, res) {
    maquinaController.maquinasCriticoCPU(req, res);
});

// FUNÇÃO CARD4 - QUANTIDADE DE MAQUINAS COM MEMÓRIA CRÍTICA
router.get("/qtdCriticoMemoria", function(req, res) {
    maquinaController.qtdCriticoMemoria(req, res);
});

// FUNÇÃO CARD4 - MOSTRAR MAQUINAS EM COM MEMÓRIA CRÍTICA
router.get("/maquinasCriticoMemoria", function(req, res) {
    maquinaController.maquinasCriticoMemoria(req, res);
});

// FUNÇÃO CARD5 - QUANTIDADE DE MAQUINAS COM DISCO CRÍTICO
router.get("/qtdCriticoDisco", function(req, res) {
    maquinaController.qtdCriticoDisco(req, res);
});

// FUNÇÃO CARD5 - MOSTRAR MAQUINAS EM COM DISCO CRÍTICO
router.get("/maquinasCriticoDisco", function(req, res) {
    maquinaController.maquinasCriticoDisco(req, res);
});


module.exports = router;