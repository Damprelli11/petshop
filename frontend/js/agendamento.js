document.addEventListener("DOMContentLoaded", async () => {
  const agendamentosList = document.getElementById("agendamentosList");

  try {
    const response = await fetch("http://localhost:3000/api/appointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const agendamentos = await response.json();
      agendamentosList.innerHTML = ""; // Limpa a lista antes de adicionar os itens
      agendamentos.forEach((agendamento) => {
        const col = document.createElement("div");
        col.classList.add("card");
        col.innerHTML = `
          <h2>${agendamento.servico}</h2>
          <p>Pet: ${agendamento.pet_nome}</p>
          <p>Cliente: ${agendamento.cliente_nome}</p>
          <p>Descrição: ${agendamento.descricao}</p>
          <p>Data: ${new Date(agendamento.data).toLocaleDateString()}</p>
          <p>Status: ${agendamento.status}</p>
          <button class="btn-finalizar" style="background-color:rgb(23, 156, 23)"  data-id="${
            agendamento.id
          }">Concluir</button>
          <button class="btn-cancelar" style="background-color:#ff3c3c" data-id="${
            agendamento.id
          }">Cancelar</button>
          <button class="btn-excluir" style="background-color:#000" data-id="${
            agendamento.id
          }">Excluir</button>
        `;
        agendamentosList.appendChild(col);
      });

      // Event listeners for finalize, cancel, and delete buttons
      agendamentosList.addEventListener("click", async (e) => {
        if (e.target.classList.contains("btn-finalizar")) {
          const id = e.target.getAttribute("data-id");
          await updateAppointmentStatus(id, "concluido");
        } else if (e.target.classList.contains("btn-cancelar")) {
          const id = e.target.getAttribute("data-id");
          await updateAppointmentStatus(id, "cancelado");
        } else if (e.target.classList.contains("btn-excluir")) {
          const id = e.target.getAttribute("data-id");
          if (confirm("Tem certeza que deseja excluir este agendamento?")) {
            await deleteAppointment(id);
          }
        }
      });
    } else {
      agendamentosList.innerHTML = `<p class="text-danger">Erro ao carregar agendamentos.</p>`;
    }
  } catch (error) {
    console.error("Erro ao conectar à API:", error);
    agendamentosList.innerHTML = `<p class="text-danger">Erro ao conectar ao servidor.</p>`;
  }
});

async function updateAppointmentStatus(id, status) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/appointments/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (response.ok) {
      alert(`Agendamento ${status} com sucesso!`);
      location.reload(); // Reload the page to reflect changes
    } else {
      alert("Erro ao atualizar o status do agendamento.");
    }
  } catch (error) {
    console.error("Erro ao conectar à API:", error);
    alert("Erro ao conectar ao servidor.");
  }
}

async function deleteAppointment(id) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/appointments/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.ok) {
      alert("Agendamento excluído com sucesso!");
      location.reload(); // Reload the page to reflect changes
    } else {
      alert("Erro ao excluir o agendamento.");
    }
  } catch (error) {
    console.error("Erro ao conectar à API:", error);
    alert("Erro ao conectar ao servidor.");
  }
}
