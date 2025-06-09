require('dotenv').config();
const { Pool } = require("pg");

// 📌 Configuração da conexão com o PostgreSQL
const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
});

// 📌 Testar conexão
pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("Erro ao conectar ao banco:", err);
    } else {
        console.log("🎯 Banco de dados conectado!", res.rows);
    }
});

module.exports = pool;
