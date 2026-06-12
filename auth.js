// Configuração do Google Sign-In
const GOOGLE_CLIENT_ID = '424109518951-bbqlvjes24r7e4mc4et9g448slvncpg4.apps.googleusercontent.com';

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

  const buttonContainer = document.getElementById('google-signin-button');
  if (buttonContainer) {
    google.accounts.id.renderButton(buttonContainer, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
    });
    google.accounts.id.prompt();
  }
}

window.initializeGoogleSignIn = initializeGoogleSignIn;

// Callback ao receber resposta do Google
function handleCredentialResponse(response) {
  // response.credential contém o JWT token
  const token = response.credential;

  // Decodificar o JWT (sem verificação - apenas para demo)
  const userData = parseJwt(token);

  console.log("Usuário autenticado:", userData);

  // Guardar token no sessionStorage
  sessionStorage.setItem("googleToken", token);
  sessionStorage.setItem("userData", JSON.stringify(userData));

  // Redirecionar para dashboard
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

// Fazer logout
function handleLogout() {
  google.accounts.id.disableAutoSelect();
  sessionStorage.removeItem("googleToken");
  sessionStorage.removeItem("userData");
  console.log("Desconectado");
  window.location.href = "index.html";
}

// Verificar se usuário está autenticado
function checkAuth() {
  const token = sessionStorage.getItem("googleToken");
  const userData = sessionStorage.getItem("userData");

  if (token && userData) {
    return JSON.parse(userData);
  }
  return null;
}

// Executar quando o documento estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  initializeGoogleSignIn();
});
