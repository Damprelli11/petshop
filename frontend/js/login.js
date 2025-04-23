document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.nome); // Store the user's name
    localStorage.setItem("userId", data.id); // Store the user's ID
    alert("Login realizado com sucesso!");
    window.location.href = "index.html"; // Redirect to the new index page
  } else {
    alert(data.message || "Erro ao fazer login.");
  }
});
