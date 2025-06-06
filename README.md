# AfyaLib

 Este projeto é um sistema para gerenciamento de uma biblioteca escolar, onde alunos podem alugar e devolver livros, e um administrador gerencia o catálogo e os usuários. O sistema controla o status dos livros (disponível ou alugado), o histórico de empréstimos, e mantém o cadastro dos alunos.

---

## Funcionalidades

### Administrador

- Cadastrar, editar e remover livros.
- Cadastrar e editar alunos.
- Registrar aluguel e devolução de livros.
- Consultar histórico de aluguéis de qualquer aluno.

### Aluno

- Pesquisar livros disponíveis.
- Solicitar aluguel de livros.
- Devolver livros alugados.
- Visualizar seu próprio histórico de aluguéis.

---

## Banco de Dados

O banco de dados foi modelado para atender as necessidades do sistema, com as seguintes principais tabelas:

- **Administrador:** Guarda os dados dos administradores do sistema.
- **Aluno:** Cadastro dos alunos com matrícula, nome e curso.
- **Livro:** Informações dos livros, como título, autor, gênero, ano e status (disponível/alugado).
- **Aluguel:** Registra os empréstimos dos livros, com datas de aluguel e devolução, status do aluguel e relacionamentos com aluno e livro.

## Para rodar o backend (na pasta backend)

### 1. instale o node https://nodejs.org/pt

### 2. Entre na pasta do backend com o terminal e rode o comando npm install

### 3. Rode o comando node app.js

#### Exemplo de rota

```js
app.post("/register", (req, res) => {
  res.json({ name: "John Doe", age: 30 });
});
```

### Temos o app seguido do metodo, a string em questão é a rota que será criado e abaixo

### a função que será executada quando o usuário acessar essa rota com esse método

### o res.json é uma forma de retornar um json
