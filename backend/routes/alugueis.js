const express = require("express");
const router = express.Router();
const pool = require("../db");

// 📌 [POST] Alugar um livro
router.post("/alugar", async (req, res) => {
    const { id_aluno, id_livro } = req.body;

    try {
        // 📌 Verificar se o livro existe na tabela 'livro'
        const livro = await pool.query("SELECT * FROM livro WHERE id_livro = $1", [id_livro]);

        console.log("Status do livro no banco:", livro.rows);

        if (livro.rows.length === 0) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        // 📌 Verificar se o livro já está alugado na tabela 'aluguel'
        const aluguelAtivo = await pool.query(
            "SELECT * FROM aluguel WHERE id_livro = $1 AND status = 'Alugado'",
            [id_livro]
        );

        console.log("Registros de aluguel ativos:", aluguelAtivo.rows);

        if (aluguelAtivo.rows.length > 0) {
            return res.status(400).json({ erro: "Livro já está alugado" });
        }

        // 📌 Registrar novo empréstimo
        await pool.query(
            "INSERT INTO aluguel (id_aluno, id_livro, status, data_aluguel) VALUES ($1, $2, 'Alugado', NOW())",
            [id_aluno, id_livro]
        );

        // 📌 Atualizar status na tabela 'livro'
        await pool.query("UPDATE livro SET status = 'Alugado' WHERE id_livro = $1", [id_livro]);

        res.json({ mensagem: "Livro alugado com sucesso!" });
    } catch (error) {
        console.error("Erro ao alugar livro:", error.message);
        res.status(500).json({ erro: "Erro ao alugar livro", detalhe: error.message });
    }
});

// 📌 [PUT] Devolver um livro
router.put("/devolver/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // 📌 Verificar se o livro está alugado antes de devolver
        const aluguel = await pool.query(
            "SELECT * FROM aluguel WHERE id_livro = $1 AND status = 'Alugado'",
            [id]
        );

        if (aluguel.rows.length === 0) {
            return res.status(400).json({ erro: "Este livro não está alugado ou já foi devolvido" });
        }

        // 📌 Atualizar status do aluguel para 'Devolvido' apenas para o registro mais recente
        await pool.query(
            "UPDATE aluguel SET status = 'Devolvido', data_devolucao = NOW() WHERE id_aluguel = (SELECT id_aluguel FROM aluguel WHERE id_livro = $1 AND status = 'Alugado' ORDER BY data_aluguel DESC LIMIT 1)",
            [id]
        );

        // 📌 Atualizar status do livro para 'Disponível'
        await pool.query("UPDATE livro SET status = 'Disponivel' WHERE id_livro = $1", [id]);

        res.json({ mensagem: "Livro devolvido com sucesso!" });
    } catch (error) {
        console.error("Erro ao devolver livro:", error.message);
        res.status(500).json({ erro: "Erro ao devolver livro", detalhe: error.message });
    }
});

module.exports = router;
