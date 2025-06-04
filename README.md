# AfyaLib

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
