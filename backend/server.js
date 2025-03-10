require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rota de Registro
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.run(query, [name, email, password], function (err) {
        if (err) {
            return res.status(500).json({ error: "Erro ao registrar usuário" });
        }
        res.status(201).json({ message: "Usuário registrado com sucesso!", userId: this.lastID });
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
