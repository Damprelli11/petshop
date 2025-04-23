document.getElementById("eventoForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const data = document.getElementById("data").value;
  const imagem = document.getElementById("imagem").files[0];
  const status = document.getElementById("status").value;

  const formData = new FormData();
  formData.append("titulo", titulo);
  formData.append("descricao", descricao);
  formData.append("data", data);
  formData.append("imagem", imagem);
  formData.append("status", status);

  try {
    const response = await fetch("http://localhost:3000/api/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Envia o token JWT
      },
      body: formData,
    });

    if (response.ok) {
      alert("Evento cadastrado com sucesso!");
      window.location.href = "index.html"; // Redirect to the index page
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
  window.location.href = "index.html"; // Redirect to the new index page
});
