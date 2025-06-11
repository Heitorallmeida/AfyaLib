const express = require("express");
const pool = require("../db");
const router = express.Router();
const {
  registrarAluno,
  loginAluno,
} = require("../controllers/alunosController");

router.post("/registro", registrarAluno);
router.post("/login", loginAluno);
router.get("/livros/:id", async (req, res) => {
  try {
    console.info("Buscando livros do aluno com ID:", req.params.id);
    const { id } = req.params;
    const resultAluguel = await pool.query(
      `SELECT * FROM aluguel WHERE id_aluno = $1`,
      [id]
    );
    console.info("Alugueis encontrados:", resultAluguel.rows);
    const books = [];
    for (const aluguel of resultAluguel.rows) {
      const resultLivro = await pool.query(
        `SELECT * FROM livro WHERE id_livro = $1`,
        [aluguel.id_livro]
      );
      console.info("Livro encontrado:", resultLivro.rows);
      if (
        resultLivro.rows.length > 0 &&
        resultLivro.rows[0].status !== "Disponivel"
      ) {
        books.push(resultLivro.rows[0]);
      }
    }
    const result = {
      rows: books,
    };
    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum livro encontrado" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    res.status(500).json({ erro: "Erro ao buscar livros" });
  }
});

module.exports = router;
