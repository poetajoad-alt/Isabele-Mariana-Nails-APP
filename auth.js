// Configuração do Google Sign-In
const GOOGLE_CLIENT_ID = '424109518951-bbqlvjes24r7e4mc4et9g448slvncpg4.apps.googleusercontent.com';
const DEFAULT_USER = {
  name: 'Maria Clara',
  given_name: 'Maria',
  email: 'mariaclara@teste.com',
  picture: 'assets/image 1.png',
};

// Inicializar o Google Sign-In
function initializeGoogleSignIn() {
  if (!window.google || !window.google.accounts || !window.google.accounts.id) {
    return;
  }

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
    auto_select: false,
    cancel_on_tap_outside: false,
  });
}

window.initializeGoogleSignIn = initializeGoogleSignIn;

// Callback ao receber resposta do Google
function handleCredentialResponse(response) {
  const token = response.credential;
  const userData = parseJwt(token);

  sessionStorage.setItem("googleToken", token);
  sessionStorage.setItem("userData", JSON.stringify(userData));
  window.location.href = "dashboard.html";
}

// Função para decodificar JWT
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );
  return JSON.parse(jsonPayload);
}

// Fazer login com Google
function handleGoogleLogin() {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    google.accounts.id.prompt();
  } else {
    alert('A biblioteca do Google ainda não carregou. Atualize a página e tente novamente.');
  }
}

// Fazer login local com usuário padrão
function handleLocalLogin(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (nome === 'Maria Clara' && senha === '1234') {
    sessionStorage.setItem('googleToken', 'local-test-token');
    sessionStorage.setItem('userData', JSON.stringify(DEFAULT_USER));
    window.location.href = 'dashboard.html';
    return false;
  }

  alert('Credenciais incorretas. Use Nome: Maria Clara e Senha: 1234');
  return false;
}

// Fazer logout
function handleLogout() {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    google.accounts.id.disableAutoSelect();
  }

  sessionStorage.removeItem("googleToken");
  sessionStorage.removeItem("userData");
  window.location.href = "index.html";
}

// Verificar se usuário está autenticado
function checkAuth() {
  const userData = sessionStorage.getItem("userData");
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
}

// Executar quando o documento estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  initializeGoogleSignIn();
});
