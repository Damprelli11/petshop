const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { nome, email, telefone, senha } = req.body; // Ensure 'nome' is received

  if (!nome || !email || !telefone || !senha) {
    return res
      .status(400)
      .json({ message: "Nome, email e senha são obrigatórios." });
  }

  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Erro ao verificar usuário:", err); // Debugging log
      return res.status(500).json({ error: err });
    }
    if (results.length > 0)
      return res.status(409).json({ message: "Usuário já existe." });

    const hashedSenha = await bcrypt.hash(senha, 10);
    const insertQuery =
      "INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)"; // Ensure 'nome' is included
    db.query(
      insertQuery,
      [nome, email, telefone, hashedSenha],
      (err, result) => {
        if (err) {
          console.error("Erro ao inserir usuário:", err); // Debugging log
          return res.status(500).json({ error: err });
        }
        console.log("Usuário inserido com sucesso:", result); // Debugging log
        res.status(201).json({ message: "Usuário registrado com sucesso!" });
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(401).json({ message: "Credenciais inválidas." });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch)
      return res.status(401).json({ message: "Credenciais inválidas." });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      message: "Login realizado com sucesso!",
      token,
      nome: user.nome, // Include the user's name
      id: user.id, // Include the user's ID
    });
  });
};
