const pool = require("../db"); // Certifique-se de que o caminho está correto
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "seuSegredoSuperSeguro"; // Melhor para segurança

// 📌 [POST] Registrar aluno
const registrarAluno = async (req, res) => {
  const { nome, email, senha, matricula, curso } = req.body;
  console.log("Dados recebidos para registro:", req.body);
  if (!nome || !email || !senha || !matricula || !curso) {
    return res.status(400).json({ erro: "Campos obrigatórios ausentes" });
  }

  try {
    // Criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      "INSERT INTO aluno (nome, email, senha, matricula, curso) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nome, email, senhaHash, matricula, curso]
    );

    res
      .status(201)
      .json({
        mensagem: "Aluno registrado com sucesso!",
        aluno: result.rows[0],
      });
  } catch (error) {
    console.error("Erro ao registrar aluno:", error);
    res
      .status(500)
      .json({ erro: "Erro ao registrar aluno", detalhe: error.message });
  }
};

// 📌 [POST] Login de aluno
const loginAluno = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query("SELECT * FROM aluno WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const aluno = result.rows[0];

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, aluno.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    // Gerar token
    const token = jwt.sign(
      { id_aluno: aluno.id_aluno, email: aluno.email },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ mensagem: "Login realizado com sucesso!", token });
  } catch (error) {
    console.error("Erro ao autenticar aluno:", error);
    res
      .status(500)
      .json({ erro: "Erro ao autenticar aluno", detalhe: error.message });
  }
};

module.exports = { registrarAluno, loginAluno };
