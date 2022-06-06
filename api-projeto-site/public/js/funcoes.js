// SESSION STORAGE
function validarSessaoUsuarios() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var id = sessionStorage.ID_USUARIO;
    var nivelPermissao = sessionStorage.NIVELPERMISSAO_USUARIO;

    if (email != null && nome != null) {
        // b_usuario.innerHTML = `${nome}<br>Código: ${id}`; 
        b_usuario.innerHTML = `<h2>Olá ${nome}</h2>
        <span>Seja bem-vindo/a</span>`;
        // <span> - Nível de permissão ${nivelPermissao}</span>`;
    } else {
        window.alert("Usuário não possui permissão para acessar esta página");
        window.location = "../login-usuarios.html";
    }

    if (nivelPermissao == 2) {
        btn_hospital.style.display = "none";
        btn_setor.style.display = "none";
        btn_usuario.style.display = "none";
    }  
    
    if (nivelPermissao >= 3) {
        limparSessaoUsuarios();
        window.alert("Usuário não possui permissão para acessar esta página, prossiga para abertura de chamados");
        window.location.href = 'https://rxmonitoramento.freshdesk.com/a/tickets/new';
    } 
}

function limparSessaoUsuarios() {
    sessionStorage.clear();
    window.location = "../login-usuarios.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.innerHTML = texto;
    }
}