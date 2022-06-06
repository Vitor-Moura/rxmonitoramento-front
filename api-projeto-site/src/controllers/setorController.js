var setorModel = require("../models/setorModel");

var sessoes = [];

function testar (req, res) {
    console.log("ENTRAMOS NA setorController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    setorModel.listar()
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}


function cadastrar(req, res) {
    var nome = req.body.nome;
    var fkHospital = req.body.fkHospital;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (fkHospital == undefined) {
        res.status(400).send("Sua rua está undefined!");
    } else {
        setorModel.cadastrar(nome, fkHospital)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

module.exports = {
    cadastrar,
    listar,   
    testar
}