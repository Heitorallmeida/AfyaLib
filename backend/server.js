const express = require("express");
const pool = require("./db"); // Agora db.js apenas gerencia a conexão

const livrosRouter = require("./routes/livros");
const alunosRouter = require("./routes/alunos");
const alugueisRouter = require("./routes/alugueis");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// 📌 Rota inicial
app.get("/", (req, res) => {
  res.send("API Biblioteca Rodando! 🚀");
});

// 📌 Configuração das rotas
app.use("/livros", livrosRouter);
app.use("/alunos", alunosRouter);
app.use("/alugueis", alugueisRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
