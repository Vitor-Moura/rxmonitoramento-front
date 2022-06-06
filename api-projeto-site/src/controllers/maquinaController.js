var maquinaModel = require("../models/maquinaModel");

var sessoes = [];

//FUNÇÃO TESTAR
function testar(req, res) {
    console.log("ENTRAMOS NA MAQUINA Controller");
    res.json("ESTAMOS FUNCIONANDO!");
}

// FUNÇÃO LISTAR TODAS AS MAQUINAS CADASTRADAS
function listarTodas(req, res) {
    maquinaModel.listarTodas()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado em listar!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta listar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO GRÁFICO 1 - CPU - LISTAR MÉDIA E PICOS DE TODAS AS MÁQUINAS
function listarUsoCPU(req, res) {
    maquinaModel.listarUsoCPU()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado em listarUsoCPU!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta listarUsoCPU! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO GRÁFICO 2 - MEMÓRIA - LISTAR MÉDIA E PICOS DE TODAS AS MÁQUINAS
function listarUsoMemoria(req, res) {
    maquinaModel.listarUsoMemoria()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado em listarUsoMemoria!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta listarUsoMemoria! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO ACOMPANHE EM TEMPO REAL - CPU, MEMEÓRIA E DISCO
function listarPorMaquina(req, res) {
    var idMaquina = req.params.idMaquina;

    maquinaModel.listarPorMaquina(idMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado em litarPorMaquina!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta listarPorMaquina! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO ACOMPANHE EM TEMPO REAL - CPU, MEMEÓRIA E DISCO
function listarUsuarioMaquina(req, res) {
    var idMaquina = req.params.idMaquina;

    maquinaModel.listarUsuarioMaquina(idMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado em listarUsuarioMaquina!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta listarUsuarioMaquina! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO 30 PROCESSOS CPU
function listarProcessosCPU(req, res) {
    var idMaquina = req.params.idMaquina;

    maquinaModel.listarProcessosCPU(idMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado em listarProcessosCPU!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta listarProcessosCPU! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


// FUNÇÃO CADASTRAR MÁQUINA
function cadastrar(req, res) {
    var hostname = req.body.hostname;
    var sistemaOp = req.body.sistemaOp;
    var fkSetor = req.body.fkSetor;
    var cpu = req.body.cpu;
    var memoria = req.body.memoria;
    var disco = req.body.disco;

    // PASSANDO ZERO SE O CHECKBOX DO CRUD NÃO ESTIVER ATIVO
    if (cpu != 1) {
        cpu = 0;
    }
    if (memoria != 1) {
        memoria = 0;
    }
    if (disco != 1) {
        disco = 0;
    }

    if (hostname == undefined) {
        res.status(400).send("Seu hostname está undefined!");
    } else if (sistemaOp == undefined) {
        res.status(400).send("Seu sistemaOp está undefined!");
    } else if (fkSetor == undefined) {
        res.status(400).send("Sua fkSetor está undefined!");
    } else {
        maquinaModel.cadastrar(hostname, sistemaOp, fkSetor, cpu, memoria, disco)
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

// FUNÇÃO EXCLUIR MÁQUINA
function excluir(req, res) {
    var idMaquina = req.params.idMaquina;

    if (idMaquina == undefined) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else {
        maquinaModel.excluir(idMaquina)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a excluisão! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// FUNÇÃO ALTERAR MÁQUINA
function alterar(req, res) {
    var idMaquina = req.body.idMaquina;
    var hostname = req.body.hostname;
    var sistemaOp = req.body.sistemaOp;
    var fkSetor = req.body.fkSetor;

    if (idMaquina == undefined) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else if (hostname == undefined) {
        res.status(400).send("Seu hostname está undefined!");
    } else if (sistemaOp == undefined) {
        res.status(400).send("Seu sistemaOp está undefined!");
    } else if (fkSetor == undefined) {
        res.status(400).send("Sua fkSetor está undefined!");
    } else {
        maquinaModel.alterar(idMaquina, hostname, sistemaOp, fkSetor)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a alteração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// FUNÇÃO PESQUISAR MÁQUINA
function pesquisarMaquina(req, res) {
    var idMaquina = req.params.idMaquina;

    maquinaModel.pesquisarMaquina(idMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado em pesquisarMaquina!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta pesquisarMaquina! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO CARD1 - QUANTIDADE DE MAQUINAS DESLIGADAS
function qtdDesligado(req, res) {
    maquinaModel.qtdDesligado()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado qtdDesligado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta qtdDesligado! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO CARD1 - MOSTRAR MAQUINAS DESLIGADAS
function maquinasDesligadas(req, res) {
    maquinaModel.maquinasDesligadas()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado maquinasDesligadas!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta maquinasDesligadas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO CARD2 - QUANTIDADE DE MAQUINAS LIGADAS
function qtdLigado(req, res) {
    maquinaModel.qtdLigado()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado qtdLigado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta qtdLigado! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO CARD2 - MOSTRAR MAQUINAS LIGADAS
function maquinasLigadas(req, res) {
    maquinaModel.maquinasLigadas()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado maquinasLigadas!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta maquinasLigadas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO CARD3 - QUANTIDADE DE MAQUINAS COM CPU CRÍTICO
function qtdCriticoCPU(req, res) {
    maquinaModel.qtdCriticoCPU()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado qtdCritico!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta qtdCritico! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO CARD3 - MOSTRAR MAQUINAS EM COM CPU CRÍTICO
function maquinasCriticoCPU(req, res) {
    maquinaModel.maquinasCriticoCPU()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado maquinasCriticoCPU!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta maquinasCriticoCPU! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO CARD4 - QUANTIDADE DE MAQUINAS COM MEMÓRIA CRÍTICA
function qtdCriticoMemoria(req, res) {
    maquinaModel.qtdCriticoMemoria()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado qtdCriticoMemoria!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta qtdCriticoMemoria! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO CARD4 - MOSTRAR MAQUINAS EM COM MEMÓRIA CRÍTICA
function maquinasCriticoMemoria(req, res) {
    maquinaModel.maquinasCriticoMemoria()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado maquinasCriticoMemoria!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta maquinasCriticoMemoria! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO CARD5 - QUANTIDADE DE MAQUINAS COM DISCO CRÍTICO
function qtdCriticoDisco(req, res) {
    maquinaModel.qtdCriticoDisco()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado qtdCriticoDisco!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta qtdCriticoDisco! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// FUNÇÃO CARD5 - MOSTRAR MAQUINAS EM COM DISCO CRÍTICO
function maquinasCriticoDisco(req, res) {
    maquinaModel.maquinasCriticoDisco()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado maquinasCriticoDisco!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta maquinasCriticoDisco! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar,
    excluir,
    alterar,
    pesquisarMaquina,
    listarTodas,
    listarUsoCPU,
    listarUsoMemoria,
    listarPorMaquina,
    listarUsuarioMaquina,
    testar,
    qtdLigado,
    qtdDesligado,
    qtdCriticoCPU,
    maquinasCriticoCPU,
    maquinasLigadas,
    maquinasDesligadas,
    qtdCriticoMemoria,
    maquinasCriticoMemoria,
    qtdCriticoDisco,
    maquinasCriticoDisco,
    listarProcessosCPU  
}