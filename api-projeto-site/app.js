//process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var hospitalRouter = require("./src/routes/hospitais");
var setorRouter = require("./src/routes/setores");
var maquinaRouter = require("./src/routes/maquinas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/hospitais", hospitalRouter);
app.use("/setores", setorRouter);
app.use("/maquinas", maquinaRouter);

app.listen(PORTA, function() {
    console.log(`Servidor do site está rodando rodando: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", banco local (MySQL Workbench). \n
    \t\tSe "producao", banco remoto (SQL Server em nuvem Azure)`);
});