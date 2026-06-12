# Configuração do Google Sign-In

Este projeto utiliza Google OAuth 2.0 para autenticação. Siga os passos abaixo para configurar a integração real com o Google.

## Passos para Configuração

### 1. Criar um Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em "Criar Projeto"
3. Nomeie o projeto como "Aplicativo Isabele Mariana" (ou seu nome preferido)
4. Clique em "Criar"

### 2. Ativar Google+ API

1. No menu lateral, clique em "APIs e Serviços"
2. Clique em "Habilitar APIs e Serviços"
3. Procure por "Google+ API"
4. Clique em "Ativar"

### 3. Criar Credenciais OAuth 2.0

1. Vá para "APIs e Serviços" → "Credenciais"
2. Clique em "Criar Credenciais" → "ID do Cliente OAuth 2.0"
3. Selecione "Aplicativo Web"
4. Configure:
   - **Nome**: "Aplicativo Isabele Mariana Web"
   - **URIs de origem autorizados**: 
     - `http://localhost:3000` (para testes local)
   - **URIs de redirecionamento autorizados**: 
     - `http://localhost:3000/dashboard.html`
5. Clique em "Criar"

> Importante: use sempre `http://localhost:3000` durante o desenvolvimento. Não use `file:///` para o fluxo do Google, pois ele não é aceito pelo OAuth do Google.

### 4. Copiar o Client ID

1. Uma janela com suas credenciais aparecerá
2. Copie o "Client ID"

### 5. Configurar o Arquivo auth.js

1. Abra o arquivo `auth.js`
2. Encontre a linha:
   ```javascript
   const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';
   ```
3. Substitua `'YOUR_GOOGLE_CLIENT_ID_HERE'` pelo seu Client ID

### 6. Testar a Integração

#### Para Testes Local (não recomendado para Google Sign-In):
1. Abra `index.html` no navegador
2. Clique em "Registre-se" ou "Login"
3. Clique no botão do Google Sign-In
4. Você será redirecionado para autenticar com sua conta Google
5. Após autenticar, será redirecionado para `dashboard.html`

> Porém a autenticação Google pode falhar se você estiver usando `file:///`.

#### Para Testes com Servidor Local (recomendado):
```bash
# Com Python 3
python -m http.server 3000

# Com Node.js (npm install -g http-server)
http-server -p 3000
```

Depois acesse `http://localhost:3000`

> Use sempre `http://localhost:3000` para o fluxo real do Google.

## Estrutura de Arquivos

- `auth.js` - Script de autenticação Google (MODIFICAR: Client ID)
- `Login.html` - Página de login com Google Sign-In
- `registro.html` - Página de registro com Google Sign-In
- `dashboard.html` - Dashboard do usuário autenticado
- `style.css` - Estilos (inclui estilos do dashboard)

## Funcionalidades Implementadas

✅ Google Sign-In em Login e Registro
✅ Armazenamento de token JWT em sessionStorage
✅ Decodificação de dados do usuário
✅ Proteção de dashboard (redirecionamento se não autenticado)
✅ Logout e limpeza de sessão
✅ Exibição de dados do usuário (nome, email, foto)

## Próximas Etapas

1. **Integração com Banco de Dados**: Guardar dados do usuário no backend
2. **Agendamento**: Implementar sistema de agendamento de serviços
3. **Integração WhatsApp**: Notificações de agendamento via WhatsApp
4. **Integração Google Calendar**: Sincronizar agendamentos com Google Calendar

## Segurança - Importante!

⚠️ **Para produção:**
- NÃO armazene o Client ID em arquivos front-end públicos
- Implemente um backend para validar tokens JWT
- Use HTTPS obrigatoriamente
- Implemente rate limiting nas APIs
- Valide permissões de usuário no backend

---

Para mais informações, consulte a [Documentação Oficial do Google Sign-In](https://developers.google.com/identity/gsi/web)
