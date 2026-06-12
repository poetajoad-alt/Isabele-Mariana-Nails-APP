// Configuração do Google Sign-In - VERSÃO DEMO (para testes local)
const GOOGLE_CLIENT_ID = 'demo-client-id-local-testing'; // Demo apenas

// Mock de usuários para teste
const mockUsers = [
  {
    given_name: 'João',
    name: 'João Silva',
    email: 'joao@example.com',
    picture: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23591c31"/%3E%3Ctext x="50" y="60" font-size="40" fill="white" text-anchor="middle"%3EJS%3C/text%3E%3C/svg%3E'
  },
  {
    given_name: 'Maria',
    name: 'Maria Santos',
    email: 'maria@example.com',
    picture: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23934761"/%3E%3Ctext x="50" y="60" font-size="40" fill="white" text-anchor="middle"%3EMS%3C/text%3E%3C/svg%3E'
  }
];

// Inicializar o Google Sign-In (Demo)
function initializeGoogleSignIn() {
  console.log('Google Sign-In Demo Inicializado');
  
  // Renderizar botão de demo se no modo local
  if (window.location.protocol === 'file:') {
    renderDemoGoogleButton();
  }
}

// Renderizar botão do Google para modo demo
function renderDemoGoogleButton() {
  const container = document.getElementById('google-signin-button');
  if (!container) return;
  
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
      <p style="text-align: center; font-size: 12px; color: #934761; margin-bottom: 8px;">
        <strong>Modo Demo - Selecione um usuário:</strong>
      </p>
      ${mockUsers.map((user, index) => `
        <button type="button" onclick="handleDemoLogin(${index})" style="
          width: 100%;
          height: 56px;
          background: white;
          border: 2px solid #591c31;
          border-radius: 24px;
          color: #591c31;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        " onmouseover="this.style.background='#f0c1d1'" onmouseout="this.style.background='white'">
          <span style="font-size: 20px;">👤</span>
          Login como ${user.given_name}
        </button>
      `).join('')}
    </div>
  `;
}

// Demo de login
function handleDemoLogin(userIndex) {
  const userData = mockUsers[userIndex];
  
  // Simular JWT token (não é um token real, apenas para demo)
  const mockToken = 'demo-token-' + userIndex;
  
  console.log('Usuário autenticado (DEMO):', userData);
  
  // Guardar dados
  sessionStorage.setItem('googleToken', mockToken);
  sessionStorage.setItem('userData', JSON.stringify(userData));
  sessionStorage.setItem('isDemoMode', 'true');
  
  // Redirecionar para dashboard demo
  window.location.href = 'dashboard-demo.html';
}

// Callback ao receber resposta do Google (versão real)
function handleCredentialResponse(response) {
  // response.credential contém o JWT token
  const token = response.credential;
  
  // Decodificar o JWT
  const userData = parseJwt(token);
  
  console.log('Usuário autenticado:', userData);
  
  // Guardar token
  sessionStorage.setItem('googleToken', token);
  sessionStorage.setItem('userData', JSON.stringify(userData));
  sessionStorage.setItem('isDemoMode', 'false');
  
  // Redirecionar para dashboard
  window.location.href = 'dashboard.html';
}

// Função para decodificar JWT
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erro ao decodificar JWT:', error);
    return null;
  }
}

// Fazer logout
function handleLogout() {
  sessionStorage.removeItem('googleToken');
  sessionStorage.removeItem('userData');
  sessionStorage.removeItem('isDemoMode');
  console.log('Desconectado');
  window.location.href = 'index.html';
}

// Verificar se usuário está autenticado
function checkAuth() {
  const token = sessionStorage.getItem('googleToken');
  const userData = sessionStorage.getItem('userData');
  
  if (token && userData) {
    return JSON.parse(userData);
  }
  return null;
}

// Executar quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  initializeGoogleSignIn();
});
