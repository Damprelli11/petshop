document
  .getElementById("cadastroForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value; // Ensure 'nome' is captured
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const telefone = document.getElementById("telefone").value;

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, telefone }), // Include 'nome' in the request body
    });

    const data = await response.json();
    if (response.ok) {
      alert("Usuário cadastrado com sucesso!");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Erro ao cadastrar usuário.");
    }
  });
