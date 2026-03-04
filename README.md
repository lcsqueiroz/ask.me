# 📘 Ask.me - Plataforma de Perguntas e Respostas

O **Ask.me** é um laboratório prático de Engenharia de Software focado no domínio de APIs REST, operações CRUD e segurança de aplicações. O projeto simula uma plataforma de interação social onde usuários podem publicar dúvidas e receber respostas da comunidade.

---

## 🚀 O "Porquê" deste Projeto

Diferente de aplicações convencionais, o **Ask.me** foi construído sob uma **filosofia de fundamentos**:
- **Vanilla JS (No-Framework):** A escolha deliberada pelo JavaScript puro no frontend visa consolidar o domínio sobre Manipulação de DOM e Fetch API antes da abstração por frameworks.
- **Security-First:** A arquitetura foi "blindada" desde o primeiro dia, tratando segurança não como um opcional, mas como um requisito funcional crítico.

---

## 🛠️ Stack Tecnológica

- **Backend:** Node.js & Express.
- **Database:** MySQL (Relacional) com Sequelize ORM (Model-first).
- **Frontend:** HTML5, CSS3 e Vanilla JavaScript.
- **Segurança:** Helmet, CORS, Express-Rate-Limit, Toobusy-js e Dotenv.

---

## 🏗️ Arquitetura do Sistema

O projeto segue o padrão **MVC (Model-View-Controller)** com uma separação rigorosa entre Client e Server (Stateless API).

### Destaques de Engenharia:
1. **Security Hardening:** Implementação de camadas de proteção contra ataques DoS, injeção de scripts (XSS) e injeção de SQL.
2. **Modelagem Relacional:** Estrutura de dados 1:N (Perguntas e Respostas) com integridade referencial via `CASCADE`.
3. **Controller Pattern:** Lógica de negócio isolada com sanitização de inputs e tratamento de erros semântico.
4. **API Prefixing:** Endpoints de dados isolados sob o prefixo `/api/` para futura escalabilidade de arquivos estáticos.

---

## 🚦 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado.
- MySQL Server rodando localmente.

### 1. Clonar e Instalar
```bash
git clone https://github.com/lcsqueiroz/ask.me.git
cd ask.me
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto seguindo este modelo:
```env
# Servidor
PORT=8000

# Banco de Dados
db_system=mysql
db_host=127.0.0.1
db_name=askme_database
db_login=seu_usuario
db_password=sua_senha
```

### 3. Iniciar o Servidor
```bash
npm start
```
*O Sequelize criará automaticamente as tabelas no seu MySQL na primeira execução através do `sequelize.sync()`.*

---

## 📡 Endpoints da API (Em Desenvolvimento)

| Método | Endpoint | Descrição | Status |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/question` | Cria uma nova pergunta | ✅ Ativo |
| **GET** | `/api/question` | Lista todas as perguntas | ⏳ Em breve |
| **POST** | `/api/answer` | Responde uma pergunta | ⏳ Em breve |

---

## 🛡️ Protocolos de Segurança Implementados
- **Zero Trust Policy:** Validação e sanitização de todos os campos no backend.
- **Rate Limit:** Proteção contra spam de requisições e ataques de força bruta.
- **No Sensitive Leaks:** Filtro de colunas para impedir o vazamento de dados internos do banco no JSON.
- **Toobusy Protection:** Monitoramento de lag no Event Loop para prevenir crash por sobrecarga.

---

## 👨‍💻 Autor
**Lucas Queiroz** - *Estagiário em Desenvolvimento de Software*

---
_Documento atualizado em: 04 de Março de 2026._
