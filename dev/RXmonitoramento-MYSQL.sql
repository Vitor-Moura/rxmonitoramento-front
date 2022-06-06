CREATE DATABASE rxmonitoramento;
USE rxmonitoramento;

CREATE TABLE 		hospital (
	id 				INT PRIMARY KEY AUTO_INCREMENT,
    nome 			VARCHAR(45),
    rua 			VARCHAR(45),
    numero			VARCHAR(45),
    bairro 			VARCHAR(45),
    cep 			CHAR(9)
)  	AUTO_INCREMENT 	100;

CREATE TABLE 		setor(
id 					INT PRIMARY KEY AUTO_INCREMENT,
nome 				VARCHAR(45),
fkHospital 			INT, 
FOREIGN KEY 		(fkHospital)
REFERENCES 			hospital (id)
) AUTO_INCREMENT 	300;


CREATE TABLE 		usuario (
    id 				INT PRIMARY KEY AUTO_INCREMENT,
    nome 			VARCHAR(45),
    email 			VARCHAR(45),
    senha 			VARCHAR(45),
    nivelPermissao 	INT,
    fkHospital 		INT,
    fkSetor 		INT,
    fkSupervisor	INT,
    FOREIGN KEY 	(fkSetor)
	REFERENCES 		setor (id),
	FOREIGN KEY 	(fkSupervisor)
	REFERENCES 		usuario (id)
)  AUTO_INCREMENT 	200;


CREATE TABLE 		maquina (
    id 				INT PRIMARY KEY AUTO_INCREMENT,
    sistemaOp 		VARCHAR(45),
    hostname 		VARCHAR(45),
    cpuCRUD			INT,
    memoriaCRUD		INT,
    discoCRUD		INT,
    fkSetor 		INT,
    FOREIGN KEY 	(fkSetor)
	REFERENCES 		setor (id)
)   AUTO_INCREMENT 	400;


CREATE TABLE 		usuarioMaquina(
	id 				INT PRIMARY KEY,
	dataHoraLogin 	VARCHAR(20),
    dataHoraLogout	VARCHAR(20),
    estado			INT,
	fkUsuario 		INT,
	fkMaquina 		INT,
	FOREIGN KEY 	(fkMaquina)
	REFERENCES 		maquina(id),
	FOREIGN KEY 	(fkUsuario)
	REFERENCES		usuario (id)
);


CREATE TABLE 		componentes (
    id 				INT PRIMARY KEY AUTO_INCREMENT,
    cpuCompPor 		DOUBLE,
    memoriaGb 		DOUBLE,
    discoGb 		DOUBLE,
    dataHora		VARCHAR(20),
    fkMaquina 		INT,
    FOREIGN KEY 	(fkMaquina)
	REFERENCES 		maquina (id)
)	AUTO_INCREMENT 	500;


CREATE TABLE 		historicoComponente (
    id 				INT PRIMARY KEY AUTO_INCREMENT,
    cpuHist 		DOUBLE,
    memoriaHist 	DOUBLE,
    discoHist 		DOUBLE,
    dataHora 		VARCHAR(20),
    fkComponentes 	INT,
    FOREIGN KEY 	(fkComponentes)
	REFERENCES 		componentes (id)
);


CREATE TABLE 		processos (
    id 				INT PRIMARY KEY AUTO_INCREMENT,
    nomeProcesso 	VARCHAR(200),
    cpuHist 		DOUBLE,
    memoria 		DOUBLE,
    dataHora 		VARCHAR(20),
	fkComponentes 	INT,
    FOREIGN KEY 	(fkComponentes)
	REFERENCES 		componentes (id)
)	AUTO_INCREMENT 	600;


INSERT INTO hospital VALUES (100, 'Hospital Paulista', 'Diogo de Faria', '780', 'Vila Clementino', '04037-002');

INSERT INTO setor VALUES (300, 'Atendimento', 100),(301, 'Pronto Socorro', 100),(308, 'Pediatria', 100),(309, 'Ortopedia', 100);

INSERT INTO usuario VALUES (202, 'Vitor Moura', 'vitor@rxmonitoramento.com.br', 'grupo5', 1, 100, 300, null),(228, 'Raylane Fernandes', 'raylane@rxmonitoramento.com.br', 'grupo5', 2, 100, 300, 202),(229,  'Silvio Moraes', 'silvio@rxmonitoramento.com.br', 'grupo5', 3, 100, 301, 228),(230, 'Simone Pereira', 'simone@rxmonitoramento.com.br', 'grupo5', 3, 100, 308, 228),(231, 'Sandra Ramos', 'sandra@rxmonitoramento.com.br', 'grupo5', 3, 100, 309, 228),(232, 'Thiago Cordeiro', 'thiago@rxmonitoramento.com.br', 'grupo5', 4, 100, 301, 229),(233, 'Gabriel Santos', 'gabriel@rxmonitoramento.com.br', 'grupo5', 4, 100, 308, 230),(234, 'Matheus Eloy', 'matheus@rxmonitoramento.com.br', 'grupo5', 4, 100, 309, 231),(235, 'Vinícius Moraes', 'vinicius@rxmonitoramento.com.br', 'grupo5', 4, 100, 301, 229);