var hospitalModel = require("../models/hospitalModel");

var sessoes = [];

function testar (req, res) {
    console.log("ENTRAMOS NA hospitalController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    hospitalModel.listar()
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
    var rua = req.body.rua;
    var numero = req.body.numero;
    var bairro = req.body.bairro;
    var cep = req.body.cep;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (rua == undefined) {
        res.status(400).send("Sua rua está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else {
        hospitalModel.cadastrar(nome, rua, numero, bairro, cep)
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