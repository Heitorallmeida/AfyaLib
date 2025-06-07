const express = require("express");
const router = express.Router();
const pool = require("../db");

// 📌 [POST] Alugar um livro
router.post("/alugar", async (req, res) => {
    const { id_aluno, id_livro } = req.body;

    try {
        // Verificar se o livro está disponível
        const livro = await pool.query("SELECT * FROM livro WHERE id_livro = $1", [id_livro]);
        if (livro.rows[0].status !== "Disponível") {
            return res.status(400).json({ erro: "Livro já está alugado" });
        }

        // Registrar empréstimo
        await pool.query(
            "INSERT INTO aluguel (id_aluno, id_livro) VALUES ($1, $2)",
            [id_aluno, id_livro]
        );

        // Atualizar status do livro para 'Alugado'
        await pool.query("UPDATE livro SET status = 'Alugado' WHERE id_livro = $1", [id_livro]);

        res.json({ mensagem: "Livro alugado com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao alugar livro" });
    }
});

// 📌 [PUT] Devolver um livro
router.put("/devolver/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Atualizar status do empréstimo para 'Devolvido'
        await pool.query(
            "UPDATE aluguel SET status = 'Devolvido', data_devolucao = NOW() WHERE id_livro = $1",
            [id]
        );

        // Atualizar status do livro para 'Disponível'
        await pool.query("UPDATE livro SET status = 'Disponível' WHERE id_livro = $1", [id]);

        res.json({ mensagem: "Livro devolvido com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao devolver livro" });
    }
});

module.exports = router;
