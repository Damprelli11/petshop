const db = require("../models/db");

exports.createAppointment = (req, res) => {
  const { servico, descricao, pet_nome, usuario_id, data } = req.body;

  if (!servico || !pet_nome || !usuario_id || !data) {
    return res.status(400).json({
      message: "Serviço, nome do pet, usuário e data são obrigatórios.",
    });
  }

  const query =
    "INSERT INTO agendamentos (servico, descricao, pet_nome, usuario_id, data, status) VALUES (?, ?, ?, ?, ?, 'pendente')";
  db.query(
    query,
    [servico, descricao, pet_nome, usuario_id, data],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({
        message: "Agendamento criado com sucesso!",
        id: result.insertId,
      });
    }
  );
};

exports.getAppointments = (req, res) => {
  const query = `
    SELECT 
      agendamentos.id,
      agendamentos.servico,
      agendamentos.descricao,
      agendamentos.pet_nome,
      agendamentos.data,
      agendamentos.status,
      usuarios.nome AS cliente_nome, -- Include the user's name
      usuarios.telefone AS cliente_telefone
    FROM agendamentos
    JOIN usuarios ON agendamentos.usuario_id = usuarios.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao executar a consulta SQL:", err); // Log SQL error
      return res.status(500).json({ error: "Erro ao buscar agendamentos." });
    }
    if (results.length === 0) {
      console.warn("Nenhum agendamento encontrado."); // Log warning if no results
      return res
        .status(404)
        .json({ message: "Nenhum agendamento encontrado." });
    }
    console.log("Agendamentos encontrados:", results); // Log results for debugging
    res.json(results); // Return all appointments with client data
  });
};

exports.updateAppointment = (req, res) => {
  const { id } = req.params;
  const { servico, descricao, pet_nome, data, status } = req.body;

  let query = "UPDATE agendamentos SET ";
  const params = [];

  if (status) {
    query += "status = ?";
    params.push(status);
  } else {
    query +=
      "servico = ?, descricao = ?, pet_nome = ?, data = ?, status = 'pendente'";
    params.push(servico, descricao, pet_nome, data);
  }

  query += " WHERE id = ?";
  params.push(id);

  db.query(query, params, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Agendamento não encontrado." });
    res.json({ message: "Agendamento atualizado com sucesso!" });
  });
};

exports.deleteAppointment = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM agendamentos WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Agendamento não encontrado." });
    res.json({ message: "Agendamento excluído com sucesso!" });
  });
};
