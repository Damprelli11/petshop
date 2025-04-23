const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extrai o token do cabeçalho Authorization

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado." });
    }

    req.user = decoded; // Armazena os dados do usuário no objeto `req`
    next();
  });
}

module.exports = verifyToken;
