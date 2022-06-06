var database = require("../database/config")

function listar() {
    console.log("ACESSEI O HOSPITAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM hospital;
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}

function cadastrar(nome, rua, numero, bairro, cep) {
    console.log("ACESSEI O HOSPITAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, rua, numero, bairro, cep);
    var instrucao = `
        INSERT INTO hospital (nome, rua, numero, bairro, cep) VALUES ('${nome}', '${rua}', '${numero}', '${bairro}', '${cep}');
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listar,
};