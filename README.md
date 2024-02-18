API de Recados

Este projeto é uma API simples para gerenciar usuários e recados.

Tecnologias Utilizadas

- Node.js
- Express
- bcrypt

Instalação

Primeiro, clone o repositório para a sua máquina local:

git clone <url do repositório>

Em seguida, navegue até o diretório do projeto e instale as dependências:

cd <diretório do projeto>
npm install

Uso

Para iniciar o servidor, execute o seguinte comando:

npm start

O servidor estará rodando na porta 8888.

Rotas

- GET /: Retorna uma mensagem indicando que o servidor está funcionando corretamente.
- GET /usuarios: Retorna todos os usuários.
- POST /criarConta: Cria um novo usuário.
- POST /login: Autentica um usuário existente.
- POST /recados: Cria um novo recado para um usuário.
- GET /recados/:usuarioId: Retorna todos os recados de um usuário específico.
- PUT /recados/:id: Atualiza um recado específico.
- DELETE /recados/:id: Deleta um recado específico.

Contribuição

Contribuições são bem-vindas. Para contribuir, por favor, faça um fork do projeto, crie uma branch, faça suas alterações e abra um Pull Request.

Licença

Este projeto está sob a licença MIT.
