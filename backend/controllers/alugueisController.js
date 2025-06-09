const pool = require("../config/db");

const listarLivrosPorAluno = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `SELECT l.* FROM livro l
             JOIN aluguel a ON l.id_livro = a.id_livro
             WHERE a.id_aluno = $1 AND a.status = 'Alugado'`,
            [id]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Erro ao listar livros do aluno:", error);
        res.status(500).json({ erro: "Erro ao listar livros do aluno" });
    }
};

const alugarLivro = async (req, res) => {
    const { id } = req.params;
    const { id_livro } = req.body;

    try {
        await pool.query(
            "INSERT INTO aluguel (id_aluno, id_livro, status) VALUES ($1, $2, 'Alugado')",
            [id, id_livro]
        );

        await pool.query(
            "UPDATE livro SET status = 'Alugado' WHERE id_livro = $1",
            [id_livro]
        );

        res.json({ mensagem: "Livro alugado com sucesso" });
    } catch (error) {
        console.error("Erro ao alugar livro:", error);
        res.status(500).json({ erro: "Erro ao alugar livro" });
    }
};

const devolverLivro = async (req, res) => {
    const { id, idLivro } = req.params;

    try {
        await pool.query(
            "UPDATE aluguel SET status = 'Devolvido', data_devolucao = CURRENT_DATE WHERE id_aluno = $1 AND id_livro = $2",
            [id, idLivro]
        );

        await pool.query(
            "UPDATE livro SET status = 'Disponivel' WHERE id_livro = $1",
            [idLivro]
        );

        res.json({ mensagem: "Livro devolvido com sucesso" });
    } catch (error) {
        console.error("Erro ao devolver livro:", error);
        res.status(500).json({ erro: "Erro ao devolver livro" });
    }
};

module.exports = { listarLivrosPorAluno, alugarLivro, devolverLivro };
