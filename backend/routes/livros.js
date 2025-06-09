const express = require("express");
const router = express.Router();
const pool = require("../db"); // Certifique-se de que o caminho está correto

// 📌 GET: Buscar todos os livros
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM livro");
        res.json(result.rows);
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
        res.status(500).json({ erro: "Erro ao buscar livros" });
    }
});

// 📌 POST: Adicionar um novo livro
router.post("/", async (req, res) => {
    const { titulo, autor, genero, ano_publicacao, status, id_adm } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO livro (titulo, autor, genero, ano_publicacao, status, id_adm) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [titulo, autor, genero, ano_publicacao, status, id_adm]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Erro ao adicionar livro:", error);
        res.status(500).json({ erro: "Erro ao adicionar livro" });
    }
});

// 📌 PUT: Atualizar um livro existente
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, genero, ano_publicacao, status, id_adm } = req.body;

    try {
        const result = await pool.query(
            "UPDATE livro SET titulo = $1, autor = $2, genero = $3, ano_publicacao = $4, status = $5, id_adm = $6 WHERE id_livro = $7 RETURNING *",
            [titulo, autor, genero, ano_publicacao, status, id_adm, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Erro ao atualizar livro:", error);
        res.status(500).json({ erro: "Erro ao atualizar livro" });
    }
});

// 📌 DELETE: Remover um livro pelo ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM livro WHERE id_livro = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        res.json({ mensagem: "Livro removido com sucesso", livro: result.rows[0] });
    } catch (error) {
        console.error("Erro ao remover livro:", error);
        res.status(500).json({ erro: "Erro ao remover livro" });
    }
});

// 📌 Exportação correta do router
module.exports = router;
