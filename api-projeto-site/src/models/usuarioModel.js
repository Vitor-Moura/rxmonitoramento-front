var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT
	maquina.id as id_maquina,
	maquina.sistemaOp as sistema_operacional,
	maquina.hostname as hostname,
	setor.nome as nome_setor,
	usuario.nome as nome_supervisor
	FROM 		maquina
		JOIN 	setor
		ON 		maquina.fkSetor=setor.id
		JOIN 	usuario
		ON 		setor.id=usuario.fkSetor
	WHERE 		nivelPermissao=2;
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}


function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}

function cadastrar(nome, email, nivelPermissao, senha, fkSetor, fkSupervisor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, nivelPermissao,  senha, fkSetor, fkSupervisor);
    var instrucao = `
        INSERT INTO usuario (nome, email, nivelPermissao, senha, fkSetor, fkSupervisor, fkHospital) VALUES ('${nome}', '${email}', '${nivelPermissao}', '${senha}', '${fkSetor}', '${fkSupervisor}', '100');
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
};