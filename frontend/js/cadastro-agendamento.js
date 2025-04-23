document
  .getElementById("agendamentoForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page reload

    const servico = document.getElementById("servico").value;
    const descricao = document.getElementById("descricao").value;
    const pet_nome = document.getElementById("pet_nome").value;
    const data = document.getElementById("data").value;

    const usuario_id = localStorage.getItem("userId");

    if (!usuario_id) {
      alert("Erro: ID do usuário não encontrado. Faça login novamente.");
      window.location.href = "login.html";
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          servico,
          descricao,
          pet_nome,
          data,
          usuario_id,
        }),
      });

      if (response.ok) {
        alert("Agendamento cadastrado com sucesso!");
        window.location.href = "agendamento.html";
      } else {
        alert("Erro ao cadastrar evento.");
      }
    } catch (error) {
      console.error("Erro ao conectar à API:", error);
      alert("Erro ao conectar ao servidor.");
    }
  });

// Botão de cancelar
document.getElementById("cancelar").addEventListener("click", () => {
  window.location.href = "agendamento.html";
});
