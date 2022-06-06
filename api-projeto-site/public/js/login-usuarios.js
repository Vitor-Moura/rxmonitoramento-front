function entrar() {
    aguardar();

    var formulario = new URLSearchParams(new FormData(document.getElementById("form_login_usuarios")));

    console.log("FORM LOGIN: ", formulario.get("login"));
    console.log("FORM SENHA: ", formulario.get("senha"));

    fetch("/usuarios/autenticar", {
        method: "POST",
        body: formulario
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {                    
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.LOGIN_USUARIO = json.login;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.NIVELPERMISSAO_USUARIO = json.nivelPermissao;

                setTimeout(function () {
                    window.location = "/index.html";
                }, 1000);
            });

        } else {

            console.log("Erro de login!");

            resposta.text().then(texto => {
                console.error(texto);                    
                // limparFormulario();
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}