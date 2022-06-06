var database = require("../database/config")

// FUNÇÃO LISTAR TODAS AS MAQUINAS CADASTRADAS
function listarTodas() {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT DISTINCT
	maquina.id AS maquinaId,
	maquina.sistemaOp AS sistemaOperacional,
	maquina.hostname AS hostname,
	setor.nome AS nomeSetor,
	usuario.nome AS nomeSupervisor,
    ROUND((componentes.cpuCompPor / (1024 * 1024 * 1024)),2) AS compCPU,
    ROUND((componentes.memoriaGb),2) AS compMemoria,
    ROUND((componentes.discoGb),2) AS compDisco,
	(select top 1 (estado)
				from usuarioMaquina where usuarioMaquina.fkMaquina=maquina.id
				order by id desc) as estado
    FROM 		maquina
	LEFT JOIN	usuarioMaquina
	ON			maquina.id=usuarioMaquina.fkMaquina
	JOIN 	    setor
	ON 		    maquina.fkSetor=setor.id
	JOIN 	    usuario
	ON 		    setor.id=usuario.fkSetor
    JOIN        componentes
    ON		    maquina.id=componentes.fkMaquina
    WHERE 		nivelPermissao=3;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO CADASTRAR MÁQUINA
function cadastrar(hostname, sistemaOp, fkSetor, cpu, memoria, disco) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", hostname, sistemaOp, fkSetor, cpu, memoria, disco);
    var instrucao = `
        INSERT INTO maquina (hostname, sistemaOp, fkSetor, cpuCRUD, memoriaCRUD, discoCRUD) VALUES ('${hostname}', '${sistemaOp}', '${fkSetor}', '${cpu}', '${memoria}', '${disco}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO EXCLUIR MÁQUINA
function excluir(idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluir():", idMaquina);
    var instrucao = `
    DELETE FROM maquina 
    WHERE		maquina.id=${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO ALTERAR MÁQUINA
function alterar(idMaquina, hostname, sistemaOp, fkSetor) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar():", idMaquina, hostname, sistemaOp, fkSetor);
    var instrucao = `
        UPDATE maquina SET hostname='${hostname}', sistemaOp='${sistemaOp}', fkSetor='${fkSetor}' WHERE maquina.id='${idMaquina}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO PESQUISAR MÁQUINA
function pesquisarMaquina(idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarMaquina()");
    var instrucao = `
    SELECT hostname, sistemaOp, fkSetor 
    FROM maquina 
    WHERE maquina.id=${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO GRÁFICO 1 - CPU - LISTAR MÉDIA E PICOS DE TODAS AS MÁQUINAS
function listarUsoCPU() {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarUsoCPU()");
    var instrucao = `
    SELECT 		maquina.id AS maquinaId, 
                ROUND(AVG(cpuHist),0) AS mediaPorcentagemCPU,
				ROUND(MAX(cpuHist),0) AS picoPorcentagemCPU
    FROM 		historicoComponente
    JOIN 		componentes
    ON 			historicoComponente.fkComponentes=componentes.id
    JOIN		maquina
    ON			componentes.fkMaquina=maquina.id
    GROUP BY	maquina.id
    ORDER BY	MAX(cpuHist) ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO GRÁFICO 2 - MEMÓRIA - LISTAR MÉDIA E PICOS DE TODAS AS MÁQUINAS
function listarUsoMemoria() {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarUsoMemoria()");
    var instrucao = `
    select 		maquina.id as maquinaId, 
	            ROUND(AVG(100 * memoriaHist / memoriaGb),0) as mediaPorcentagemMemoria,
                ROUND(MAX(100 * memoriaHist / memoriaGb),0) as picoPorcentagemMemoria
    from 		[dbo].[historicoComponente]
    join 		[dbo].[componentes]
    on 			[dbo].[historicoComponente].fkComponentes=[dbo].[componentes].id
    join		[dbo].[maquina]
    on			[dbo].[componentes].fkMaquina=[dbo].[maquina].id
    group by	maquina.id
    order by	max(memoriaHist) asc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO ACOMPANHE EM TEMPO REAL - CPU, MEMEÓRIA E DISCO
function listarPorMaquina(idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorMaquina()");
    var instrucao = `
    SELECT 		maquina.id AS maquinaId, 
                ROUND((cpuHist),0) AS agoraPorcentagemCPU, 
                ROUND((100 * memoriaHist / memoriaGb),0) AS agoraPorcentagemMemoria,
                ROUND((100 * discoHist / discoGb),0) AS agoraPorcentagemDisco,
                maquina.sistemaOp AS sistemaOperacional,
                maquina.hostname AS hostname,
                setor.nome AS nomeSetor,
                usuario.nome AS nomeSupervisor,
                ROUND((componentes.cpuCompPor / (1024 * 1024 * 1024)),2) AS compCPU,
                ROUND((componentes.memoriaGb),2) AS compMemoria,
                ROUND((componentes.discoGb),2) AS compDisco,
                historicoComponente.dataHora
    FROM 		historicoComponente
    JOIN 		componentes
    ON 			historicoComponente.fkComponentes=componentes.id
    JOIN		maquina
    ON			componentes.fkMaquina=maquina.id
    JOIN		setor
    ON			maquina.fkSetor=setor.id
    JOIN		usuario
    ON			usuario.fkSetor=setor.id
    WHERE 		usuario.nivelPermissao=3
    AND      	[dbo].[maquina].id = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO ACOMPANHE EM TEMPO REAL - CPU, MEMEÓRIA E DISCO
function listarUsuarioMaquina(idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarUsuarioMaquina()");
    var instrucao = `
    SELECT 		usuarioMaquina.dataHoraLogin AS dataHoraLogin,
			    usuarioMaquina.dataHoraLogout AS dataHoraLogout,
			    usuarioMaquina.estado AS estado,
				usuario.nome AS nomeUsuarioLogado
    FROM		usuarioMaquina
	JOIN		usuario
	ON			usuario.id=usuarioMaquina.fkUsuario
	WHERE		usuario.id=usuarioMaquina.fkUsuario 		
    AND 		fkMaquina= ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO 30 ORDENADOS POR CPU
function listarProcessosCPU(idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarProcessosCPU()");
    var instrucao = `
    SELECT TOP 40 *
    FROM (
        SELECT 	DISTINCT nomeProcesso AS nomeProcesso,
                processos.id as idProcessos
        FROM	processos
        JOIN	componentes 
        ON		componentes.id=processos.fkComponentes
        WHERE	componentes.fkMaquina=${idMaquina}
        ) todos
    ORDER BY 	todos.idProcessos DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO CARD1 - QUANTIDADE DE MAQUINAS DESLIGADAS
function qtdDesligado() {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function qtdDesligado()");
    var instrucao = `
    SELECT COUNT (*) AS countDesligado
    FROM (
    SELECT DISTINCT	maquina.id as idMaquina, 
                    (SELECT TOP 1 usuarioMaquina.estado 
                    FROM usuariomaquina 
                    WHERE maquina.id=usuarioMaquina.fkMaquina 
                    ORDER BY usuariomaquina.id DESC) AS estado
    FROM			maquina
    JOIN			usuarioMaquina	
    ON				maquina.id=usuarioMaquina.fkMaquina
    ) todas
    WHERE 			estado='desligado';    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO CARD1 - MOSTRAR MAQUINAS DESLIGADAS
function maquinasDesligadas() {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function maquinasDesligadas()");
    var instrucao = `
    SELECT *
    FROM (
    SELECT DISTINCT	maquina.id as idMaquina, 
                    (SELECT TOP 1 usuarioMaquina.estado 
                    FROM usuariomaquina 
                    WHERE maquina.id=usuarioMaquina.fkMaquina 
                    ORDER BY usuariomaquina.id DESC) AS estado
    FROM			maquina
    JOIN			usuarioMaquina	
    ON				maquina.id=usuarioMaquina.fkMaquina
    ) todas
    WHERE 			estado='desligado';  
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO CARD2 - QUANTIDADE DE MAQUINAS LIGADAS
function qtdLigado() {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function qtdLigado()");
    var instrucao = `
    SELECT COUNT (*) AS countLigado
    FROM (
    SELECT DISTINCT	maquina.id as idMaquina, 
                    (SELECT TOP 1 usuarioMaquina.estado 
                    FROM usuariomaquina 
                    WHERE maquina.id=usuarioMaquina.fkMaquina 
                    ORDER BY usuariomaquina.id DESC) AS estado
    FROM			maquina
    JOIN			usuarioMaquina	
    ON				maquina.id=usuarioMaquina.fkMaquina
    ) todas
    WHERE 			estado='ligado';     	
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO CARD2 - MOSTRAR MAQUINAS LIGADAS
function maquinasLigadas() {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function maquinasLigadas()");
    var instrucao = `
    SELECT *
    FROM (
    SELECT DISTINCT	maquina.id as idMaquina, 
                    (SELECT TOP 1 usuarioMaquina.estado 
                    FROM usuariomaquina 
                    WHERE maquina.id=usuarioMaquina.fkMaquina 
                    ORDER BY usuariomaquina.id DESC) AS estado
    FROM			maquina
    JOIN			usuarioMaquina	
    ON				maquina.id=usuarioMaquina.fkMaquina
    ) todas
    WHERE 			estado='ligado';  
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO CARD3 - QUANTIDADE DE MAQUINAS COM CPU CRÍTICO
function qtdCriticoCPU() {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function qtdCriticoCPU()");
    var instrucao = `
    SELECT 		COUNT (maquina.id) AS countCriticoCPU
    FROM 		maquina
    LEFT JOIN	usuarioMaquina
    ON			maquina.id=usuarioMaquina.fkMaquina
    JOIN 		componentes
    ON			maquina.id=componentes.fkMaquina
    JOIN		agoraComponente
    ON 			agoraComponente.fkComponentes=componentes.id
    WHERE 		agoraComponente.cpuAgora >= 80
    AND			usuarioMaquina.estado='ligado';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO CARD3 - MOSTRAR MAQUINAS EM COM CPU CRÍTICO
function maquinasCriticoCPU() {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function maquinasCriticoCPU()");
    var instrucao = `
    SELECT 		maquina.id AS idMaquina,
    ROUND((agoraComponente.cpuAgora),0) AS cpuEmUso
    FROM 		maquina
    LEFT JOIN	usuarioMaquina
    ON			maquina.id=usuarioMaquina.fkMaquina
    JOIN 		componentes
    ON			maquina.id=componentes.fkMaquina
    JOIN		agoraComponente
    ON 			agoraComponente.fkComponentes=componentes.id
    WHERE 		agoraComponente.cpuAgora >= 80
    AND			usuarioMaquina.estado='ligado';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO CARD4 - QUANTIDADE DE MAQUINAS COM MEMÓRIA CRÍTICA
function qtdCriticoMemoria() {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function qtdCriticoMemoria()");
    var instrucao = `
    SELECT 		COUNT (maquina.id) AS countCriticoMemoria
    FROM 		maquina
    LEFT JOIN	usuarioMaquina
    ON			maquina.id=usuarioMaquina.fkMaquina
    JOIN 		componentes
    ON			maquina.id=componentes.fkMaquina
    JOIN		agoraComponente
    ON 			agoraComponente.fkComponentes=componentes.id
    WHERE  		ROUND((100 * agoraComponente.memoriaAgora / componentes.memoriaGb),0) >= 80
    AND			usuarioMaquina.estado='ligado';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO CARD4 - MOSTRAR MAQUINAS EM COM MEMÓRIA CRÍTICA
function maquinasCriticoMemoria() {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function maquinasCriticoMemoria()");
    var instrucao = `
    SELECT 		maquina.id AS idMaquina,
    ROUND((100 * agoraComponente.memoriaAgora / componentes.memoriaGb),0) AS memoriaEmUso
    FROM 		maquina
    LEFT JOIN	usuarioMaquina
    ON			maquina.id=usuarioMaquina.fkMaquina
    JOIN 		componentes
    ON			maquina.id=componentes.fkMaquina
    JOIN		agoraComponente
    ON 			agoraComponente.fkComponentes=componentes.id
    WHERE  		ROUND((100 * agoraComponente.memoriaAgora / componentes.memoriaGb),0) >= 80
    AND			usuarioMaquina.estado='ligado';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO CARD5 - QUANTIDADE DE MAQUINAS COM DISCO CRÍTICO
function qtdCriticoDisco() {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function qtdCriticoDisco()");
    var instrucao = `
    SELECT 		COUNT (maquina.id) AS countCriticoDisco
    FROM 		maquina
    LEFT JOIN	usuarioMaquina
    ON			maquina.id=usuarioMaquina.fkMaquina
    JOIN 		componentes
    ON			maquina.id=componentes.fkMaquina
    JOIN		agoraComponente
    ON 			agoraComponente.fkComponentes=componentes.id
    WHERE  		ROUND((100 * agoraComponente.discoAgora / componentes.discoGb),0) >= 80
    AND			usuarioMaquina.estado='ligado';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// FUNÇÃO CARD5 - MOSTRAR MAQUINAS EM COM DISCO CRÍTICO
function maquinasCriticoDisco() {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function maquinasCriticoDisco()");
    var instrucao = `
    SELECT 		maquina.id AS idMaquina,
    ROUND((100 * agoraComponente.discoAgora / componentes.discoGb),0) AS discoEmUso
    FROM 		maquina
    LEFT JOIN	usuarioMaquina
    ON			maquina.id=usuarioMaquina.fkMaquina
    JOIN 		componentes
    ON			maquina.id=componentes.fkMaquina
    JOIN		agoraComponente
    ON 			agoraComponente.fkComponentes=componentes.id
    WHERE  		ROUND((100 * agoraComponente.discoAgora / componentes.discoGb),0) >= 80
    AND			usuarioMaquina.estado='ligado';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
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
    qtdDesligado,
    qtdLigado,
    qtdCriticoCPU,
    maquinasCriticoCPU,
    maquinasLigadas,
    maquinasDesligadas,
    qtdCriticoMemoria,
    maquinasCriticoMemoria,
    qtdCriticoDisco,
    maquinasCriticoDisco,
    listarProcessosCPU
};