const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Biblioteca Rodando! 🚀');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



app.get('/livros', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM livro');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});
