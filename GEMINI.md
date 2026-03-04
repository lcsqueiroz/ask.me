# 📘 Guia de Contexto e Arquitetura: Projeto Ask.me

## 1. Visão Geral e Propósito

Este documento serve como a "Fonte da Verdade" para o desenvolvimento do projeto **Ask.me**. Ele estabelece as diretrizes, restrições e objetivos que devem ser respeitados em todas as interações com a IA.

### 1.1 O "Porquê" do Projeto

Este projeto não é apenas uma aplicação funcional, mas um **laboratório de fundamentos**.

- **Finalidade:** Estudo autodirigido e prático de Engenharia de Software.
- **Motivação:** Aplicar fundamentos de **API REST** e operações **CRUD** (Create, Read, Update, Delete) em um cenário real.
- **Domínio:** Plataforma de interação social baseada em perguntas e respostas (estilo ask.fm).

### 1.2 A Escolha Tecnológica (The "Why")

- **Vanilla JS (Frontend):** A escolha deliberada de não usar frameworks (React/Vue/Angular) visa consolidar o domínio sobre a Manipulação de DOM, Event Listeners e Fetch API. O objetivo é entender "como a mágica acontece" antes de abstraí-la.
- **Node.js & Express (Backend):** Utilizado para construir um servidor robusto que atue estritamente como um provedor de dados (API).
- **MySQL:** Escolha baseada na necessidade de entender modelagem relacional, chaves estrangeiras e integridade de dados.

---

## 2. Princípios de Interação com a IA (Modus Operandi)

A IA (Gemini) deve atuar como um **Consultor de Arquitetura Sênior**.

### 2.1 Regras de Resposta para a IA

1.  **Prioridade Arquitetural:** Antes de sugerir qualquer implementação, a IA deve validar se a sugestão respeita a separação entre Client e Server.
2.  **Não-Geração de Código Massivo:** A IA **não deve** entregar o código pronto para "copy-paste". Ela deve explicar a lógica, descrever o algoritmo ou sugerir a assinatura de funções e rotas.
3.  **Mentoria Técnica:** Ao sugerir uma escolha, a IA deve explicar o "porquê" (ex: "Usamos o método POST aqui porque estamos criando um novo recurso...").
4.  **Respeito às Constraints:** Nunca sugerir Template Engines (EJS/Handlebars) ou bibliotecas que fujam do escopo Vanilla JS estabelecido.

---

## 3. Requisitos de Negócio (User Stories)

### 3.1 Funcionalidades Principais

- **Criação de Perguntas:** Qualquer usuário pode acessar a página inicial e publicar uma pergunta (Título e Descrição).
- **Listagem Global:** A página inicial deve exibir todas as perguntas registradas no banco de dados, em ordem cronológica inversa (mais recentes primeiro).
- **Página da Pergunta (Deep Link):** Ao clicar em uma pergunta na Home, o usuário é levado a uma página específica que exibe a pergunta detalhada e todas as suas respectivas respostas.
- **Sistema de Respostas:** Tanto o criador da pergunta quanto outros usuários podem enviar comentários/respostas para qualquer pergunta existente.
- **Visualização Dinâmica:** As perguntas devem indicar se já possuem respostas ou se ainda estão "pendentes".

---

## 4. Especificações da Arquitetura Técnica

### 4.1 Camada de Backend (API REST)

- **Padrão:** O servidor deve ser **Stateless**. Ele não renderiza páginas, apenas processa requisições e retorna JSON.
- **Segurança:**
  - Uso obrigatório de variáveis de ambiente (`.env`) para strings de conexão.
  - Tratamento de erros centralizado para não expor stack traces ao cliente.
  - Prevenção de SQL Injection via ORM ou Prepared Statements.

### 4.2 Camada de Frontend (Client-Side)

- **Estratégia de Renderização:** Manipulação de DOM via JavaScript. O HTML é um esqueleto estático servido pelo Express.
- **Comunicação:** Uso exclusivo de `fetch()` com `async/await`.
- **Segurança:** Prevenção de XSS (Cross-Site Scripting) através do uso rigoroso de `.textContent` ao renderizar dados vindo de usuários.

### 4.3 Modelagem de Dados (Conceitual)

O banco de dados MySQL deve refletir a seguinte hierarquia:

1.  **Tabela `Questions`**:
    - `id` (PK), `title`, `description`, `createdAt`, `updatedAt`.
2.  **Tabela `Answers`**:
    - `id` (PK), `body`, `questionId` (FK relacionando com `Questions`), `createdAt`.

---

## 5. Justificativa da Documentação Detalhada

A documentação rigorosa e detalhada neste arquivo `.md` é o que garante que a IA não se perca no contexto ao longo das semanas de desenvolvimento.
Este documento é o **filtro de qualidade** para:

- Evitar sugestões amadoras.
- Garantir que as decisões técnicas respeitem o plano de estudos de Ciência da Computação.
- Manter a consistência da stack, impedindo a introdução de dependências desnecessárias.

---

## 6. 🗄️ Modelagem de Dados (Sequelize)

- **Abordagem:** Model-first (Definição via código Node.js).
- **Ferramenta:** Sequelize ORM.
- **Estratégia de Sincronização:** - Desenvolvimento: `sequelize.sync()` para prototipagem rápida.
  - Produção: Futura implementação de _Migrations_ para versionamento de schema.

---

## 7. Protocolos de Segurança (Security Hardening)

1. **Zero Trust Policy:** Validar todos os campos (title, body) no backend antes de processar no Sequelize.
2. **CORS Restricted:** A API só deve responder a requisições originadas do domínio do projeto.
3. **No Sensitive Leaks:** Proibido retornar colunas sensíveis ou objetos brutos do banco no JSON.
4. **XSS Prevention:** Uso obrigatório de `.textContent` no Vanilla JS; sanitização de strings no Backend.
5. **Rate Limit:** Limitar POSTs nas rotas de pergunta e resposta para prevenir spam no MySQL.

### 8. Camada de Segurança Implementada

- **Middlewares**: Helmet, CORS, Rate-Limit, Toobusy, body-parser.
- **Configuração**: Centralizada em `/config/security.js` para desacoplar da inicialização do servidor.
- **JSON Payload**: Limitação de tamanho de body para evitar ataques de estouro de memória.

### 9. Tratamento de Erros e Status Codes

- **Padrão de Resposta:** Todas as respostas de erro devem retornar um objeto JSON contendo o código e uma mensagem descritiva.
- **Rate Limit (429):** Implementado para mitigar ataques de spam e garantir a disponibilidade do MySQL.
  _Documento atualizado em: 03 de Março de 2026._
  _Autor: Lucas Queiroz - Estagiário em Desenvolvimento de Software_
