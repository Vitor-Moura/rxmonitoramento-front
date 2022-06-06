CREATE TABLE hospital(
	id 				INT PRIMARY KEY IDENTITY(100, 1),
    nome 			VARCHAR(45),
    rua 			VARCHAR(45),
    numero			VARCHAR(45),
    bairro 			VARCHAR(45),
    cep 			CHAR(9)
);



CREATE TABLE 		setor(
id 					INT PRIMARY KEY IDENTITY(300 ,1),
nome 				VARCHAR(45),
fkHospital 			INT, 
FOREIGN KEY 		(fkHospital)
REFERENCES 			hospital (id)
);



CREATE TABLE 		usuario (
    id 				INT PRIMARY KEY IDENTITY (200, 1),
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
);

CREATE TABLE 		maquina (
    id 				INT PRIMARY KEY IDENTITY (400, 1),
    sistemaOp 		VARCHAR(45),
    hostname 		VARCHAR(45),
    cpuCRUD			INT,
    memoriaCRUD		INT,
    discoCRUD		INT,
    fkSetor 		INT,
    FOREIGN KEY 	(fkSetor)
	REFERENCES 		setor (id)
);

CREATE TABLE 		usuarioMaquina(
	id 				INT PRIMARY KEY IDENTITY,
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
    id 				INT PRIMARY KEY IDENTITY(500, 1),
    cpuCompPor 		FLOAT,
    memoriaGb 		FLOAT,
    discoGb 		FLOAT,
    fkMaquina 		INT,
    dataHora		VARCHAR(20),
    FOREIGN KEY 	(fkMaquina)
	REFERENCES 		maquina (id)
);

CREATE TABLE 		historicoComponente (
    id 				INT PRIMARY KEY IDENTITY (1, 1),
    cpuHist 		FLOAT,
    memoriaHist 	FLOAT,
    discoHist 		FLOAT,
    dataHora 		VARCHAR(20),
    fkComponentes 	INT,
    FOREIGN KEY 	(fkComponentes)
	REFERENCES 		componentes (id)
);

CREATE TABLE 		agoraComponente (
    id 				INT PRIMARY KEY IDENTITY (1, 1),
    cpuAgora 		FLOAT,
    memoriaAgora 	FLOAT,
    discoAgora 		FLOAT,
    dataHora 		VARCHAR(20),
    fkComponentes 	INT,
    FOREIGN KEY 	(fkComponentes)
	REFERENCES 		componentes (id)
);

CREATE TABLE 		processos (
    id 				INT PRIMARY KEY IDENTITY(600, 1),
    nomeProcesso 	VARCHAR(200),
    cpuHist 		FLOAT,
    memoria 		FLOAT,
    fkComponentes 	INT,
    dataHora 		VARCHAR(20),
    FOREIGN KEY 	(fkComponentes)
	REFERENCES 		componentes (id)
)	;