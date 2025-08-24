<h1>🐾 Projeto Node.js com Banco de Dados - Petshop</h1>

<p>
  Este projeto é composto por um <b>backend em Node.js</b> conectado a um <b>banco de dados MySQL</b> 
  e um <b>frontend simples</b>.  
  Siga as instruções abaixo para rodar a aplicação em sua máquina local.
</p>

<hr>

<h2>🚀 Pré-requisitos</h2>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a></li>
  <li><a href="https://www.mysql.com/">MySQL</a> (ou outro SGBD compatível)</li>
  <li><a href="https://git-scm.com/">Git</a></li>
  <li>Extensão <b>Live Server</b> instalada no editor (ex.: VS Code)</li>
</ul>

<hr>

<h2>📦 Instalação</h2>
<ol>
  <li>Clone o repositório:</li>
</ol>

<pre><code>git clone https://github.com/Damprelli11/petshop.git
</code></pre>

<hr>

<h2>🗄️ Banco de Dados</h2>
<ol>
  <li>Inicie o <b>MySQL</b> no seu computador.</li>
  <li>Crie o banco de dados usando o arquivo <code>banco_petshop.sql</code>:</li>
</ol>

<pre><code>mysql -u seu_usuario -p &lt; banco_petshop.sql
</code></pre>

<hr>

<h2>🔧 Configuração do Backend</h2>
<ol>
  <li>Acesse a pasta do backend:</li>
</ol>

<pre><code>cd backend
</code></pre>

<ol start="2">
  <li>Configure as variáveis de ambiente no arquivo <b>.env</b>:</li>
</ol>

<pre><code>DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=banco_petshop
</code></pre>

<ol start="3">
  <li>Instale as dependências e inicie o servidor:</li>
</ol>

<pre><code>npm install
npm start
</code></pre>

<p>O backend rodará através do arquivo <code>server.js</code>.</p>

<hr>

<h2>🌐 Rodando o Frontend</h2>
<ol>
  <li>Acesse a pasta do frontend (ex.: <code>frontend/</code>).</li>
  <li>Clique com o botão direito no arquivo <code>login.html</code> e selecione <b>"Open with Live Server"</b>.</li>
  <li>Certifique-se de ter a extensão <b>Live Server</b> instalada no VS Code.</li>
</ol>

<hr>

<h2>✅ Pronto!</h2>
<p>
  Agora sua aplicação deve estar funcionando:  
  <ul>
    <li><b>Backend</b> ativo em Node.js conectado ao MySQL</li>
    <li><b>Frontend</b> servindo a interface no navegador</li>
  </ul>
</p>
