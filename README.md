  <h1>Backend do Desafio Técnico - Gerenciamento de Eventos</h1>
  <p>
    Este repositório contém a implementação do backend para o sistema de gerenciamento de eventos, desenvolvido como parte do desafio técnico para a vaga de Desenvolvedor Front-End Pleno (Angular). O backend foi construído utilizando <strong>JSON Server</strong> e <strong>Node.js</strong>, com funcionalidades de autenticação, CRUD de eventos e simulação de uma API RESTful.
  </p>

  <h2>Funcionalidades Implementadas</h2>

  <h3>1. Autenticação</h3>
  <ul>
    <li>
      <strong>Registro de Usuário</strong>:
      <ul>
        <li>Endpoint: <code>POST /auth/register</code></li>
        <li>Permite o cadastro de novos usuários com nome, email e senha.</li>
        <li>Verifica se o email já está cadastrado.</li>
        <li>Gera um token JWT válido por 1 hora.</li>
      </ul>
    </li>
    <li>
      <strong>Login de Usuário</strong>:
      <ul>
        <li>Endpoint: <code>POST /auth/login</code></li>
        <li>Autentica o usuário com base no email e senha.</li>
        <li>Retorna um token JWT válido por 1 hora.</li>
      </ul>
    </li>
  </ul>

  <h3>2. Gerenciamento de Eventos</h3>
  <ul>
    <li>
      <strong>Listagem de Eventos</strong>:
      <ul>
        <li>Endpoint: <code>GET /events</code></li>
        <li>Retorna a lista completa de eventos cadastrados.</li>
      </ul>
    </li>
    <li>
      <strong>Detalhes de um Evento</strong>:
      <ul>
        <li>Endpoint: <code>GET /events/:id</code></li>
        <li>Retorna os detalhes de um evento específico com base no ID.</li>
      </ul>
    </li>
    <li>
      <strong>Atualização de Evento</strong>:
      <ul>
        <li>Endpoint: <code>PATCH /events/:id</code></li>
        <li>Permite a atualização parcial dos dados de um evento.</li>
      </ul>
    </li>
    <li>
      <strong>Exclusão de Evento</strong>:
      <ul>
        <li>Endpoint: <code>DELETE /events/:id</code></li>
        <li>Remove um evento com base no ID.</li>
      </ul>
    </li>
  </ul>

  <h3>3. Proteção de Rotas</h3>
  <ul>
    <li>Todas as rotas relacionadas a eventos (exceto <code>GET /events</code>) são protegidas por autenticação JWT.</li>
    <li>O token deve ser enviado no cabeçalho <code>Authorization</code> no formato <code>Bearer &lt;token&gt;</code>.</li>
  </ul>

  <h2>Estrutura do Projeto</h2>

  <h3>Arquivos Principais</h3>
  <ul>
    <li>
      <strong><code>database.json</code></strong>:
      <ul>
        <li>Contém os dados iniciais dos eventos e usuários.</li>
        <li>Estrutura:
          <pre><code>
{
  "events": [
    {
      "id": "1",
      "title": "Congresso de Jovens Cristãos",
      "shortDescription": "Um encontro para fortalecer a fé e comunhão entre jovens.",
      "fullDescription": "O Congresso de Jovens Cristãos é um evento anual que reúne jovens de diversas igrejas para momentos de louvor, adoração, palestras edificantes e comunhão.",
      "status": "active",
      "publishDate": "2025-03-10T10:00:00Z",
      "image": "https://picsum.photos/200/400"
    }
  ],
  "users": [
    {
      "id": "1",
      "username": "admin",
      "email": "admin@email.com",
      "password": "admin123"
    }
  ]
}
          </code></pre>
        </li>
      </ul>
    </li>
    <li>
      <strong><code>server.js</code></strong>:
      <ul>
        <li>Configura o JSON Server e adiciona middlewares para autenticação e proteção de rotas.</li>
        <li>Implementa os endpoints de registro, login e gerenciamento de eventos.</li>
      </ul>
    </li>
    <li>
      <strong><code>users.json</code></strong>:
      <ul>
        <li>Armazena os dados dos usuários cadastrados.</li>
      </ul>
    </li>
  </ul>

  <h2>Tecnologias Utilizadas</h2>
  <ul>
    <li><strong>JSON Server</strong>: Simula uma API RESTful com operações CRUD.</li>
    <li><strong>Node.js</strong>: Ambiente de execução para o servidor.</li>
    <li><strong>JWT (JSON Web Tokens)</strong>: Para autenticação e proteção de rotas.</li>
    <li><strong>Body Parser</strong>: Para processar dados enviados no corpo das requisições.</li>
  </ul>

  <h2>Como Executar o Projeto</h2>
  <ol>
    <li>Clone o repositório:
      <pre><code>git clone https://github.com/lpereira1025/BackEndChallenge.git</code></pre>
    </li>
    <li>Instale as dependências:
      <pre><code>npm install</code></pre>
    </li>
    <li>Inicie o servidor:
      <pre><code>npm run server</code></pre>
    </li>
    <li>Acesse a API em <a href="http://localhost:8000" target="_blank">http://localhost:8000</a>.</li>
  </ol>

  <h2>Contato</h2>
  <p>
    Para mais informações, entre em contato:
    <ul>
      <li><strong>Nome</strong>: [Seu Nome]</li>
      <li><strong>Email</strong>: [seu-email@example.com]</li>
      <li><strong>LinkedIn</strong>: <a href="https://www.linkedin.com/in/seu-perfil" target="_blank">Seu LinkedIn</a></li>
      <li><strong>GitHub</strong>: <a href="https://github.com/seu-usuario" target="_blank">Seu GitHub</a></li>
    </ul>
  </p>
