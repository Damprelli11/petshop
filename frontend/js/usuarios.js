document.addEventListener("DOMContentLoaded", async () => {
  const usuariosList = document.getElementById("usuariosList");
  const usuarioForm = document.getElementById("usuarioForm");

  // Fetch and display users
  async function fetchUsuarios() {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const usuarios = await response.json();
        usuariosList.innerHTML = "";
        usuarios.forEach((usuario) => {
          const li = document.createElement("li");
          li.classList.add("list-group-item");
          li.textContent = `${usuario.nome} - ${usuario.email}`;
          usuariosList.appendChild(li);
        });
      } else {
        usuariosList.innerHTML = `<li class="list-group-item text-danger">Erro ao carregar usuários.</li>`;
      }
    } catch (error) {
      console.error("Erro ao conectar à API:", error);
      usuariosList.innerHTML = `<li class="list-group-item text-danger">Erro ao conectar ao servidor.</li>`;
    }
  }

  // Handle user registration
  usuarioForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const telefone = document.getElementById("telefone").value; // Added telefone field

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ nome, email, senha, telefone }), // Include telefone in the request body
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        usuarioForm.reset();
        fetchUsuarios(); // Refresh the user list
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro ao conectar à API:", error);
      alert("Erro ao conectar ao servidor.");
    }
  });

  // Initial fetch of users
  fetchUsuarios();
});
