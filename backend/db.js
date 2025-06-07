// Requer dotenv para variáveis de ambiente
require('dotenv').config();

// Importação de módulos
const express = require("express");
const { Pool } = require("pg");

// Inicialização do servidor Express
const app = express();
app.use(express.json());

// Conexão com banco de dados PostgreSQL
const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
});

// 📌 GET: Buscar todos os livros
app.get("/livros", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM livro");
        res.json(result.rows);
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
        res.status(500).json({ erro: "Erro ao buscar livros" });
    }
});

// 📌 POST: Adicionar um novo livro
app.post("/livros", async (req, res) => {
    const { titulo, autor, genero, ano_publicacao, status = "Disponivel", id_adm } = req.body;

    if (!titulo || !autor || !id_adm) {
        return res.status(400).json({
            erro: "Campos obrigatórios ausentes",
            detalhe: "Certifique-se de enviar 'titulo', 'autor' e 'id_adm'"
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO livro (titulo, autor, genero, ano_publicacao, status, id_adm)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [titulo, autor, genero, ano_publicacao, status, id_adm]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Erro ao adicionar livro:", error.message);
        res.status(500).json({ erro: "Erro ao adicionar livro", detalhe: error.message });
    }
});

// 📌 PUT: Atualizar um livro existente
app.put("/livros/:id", async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, genero, ano_publicacao, status, id_adm } = req.body;

    try {
        const result = await pool.query(
            `UPDATE livro SET titulo = $1, autor = $2, genero = $3, ano_publicacao = $4, status = $5, id_adm = $6
             WHERE id_livro = $7 RETURNING *`,
            [titulo, autor, genero, ano_publicacao, status, id_adm, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Erro ao atualizar livro:", error.message);
        res.status(500).json({ erro: "Erro ao atualizar livro", detalhe: error.message });
    }
});

// 📌 DELETE: Remover um livro pelo ID
app.delete("/livros/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM livro WHERE id_livro = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        res.json({ mensagem: "Livro removido com sucesso", livro: result.rows[0] });
    } catch (error) {
        console.error("Erro ao remover livro:", error.message);
        res.status(500).json({ erro: "Erro ao remover livro", detalhe: error.message });
    }
});

// 📌 Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
