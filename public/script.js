const apiUrl = 'http://localhost:3000/reservas';

// Função para criar uma nova reserva
document.getElementById('createReservationForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nomeCliente = document.getElementById('nomeCliente').value;
  const numeroMesa = document.getElementById('numeroMesa').value;
  const dataHoraReserva = document.getElementById('dataHoraReserva').value;
  const status = document.getElementById('status').value;
  const contatoCliente = document.getElementById('contatoCliente').value;

  const newReservation = {
    nomeCliente,
    numeroMesa,
    dataHoraReserva,
    status,
    contatoCliente,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReservation),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      loadReservations();
    } else {
      alert('Erro ao criar a reserva: ' + data.message);
    }
  } catch (err) {
    console.error('Erro ao criar reserva:', err);
  }
});

// Função para carregar as reservas na lista
async function loadReservations() {
  try {
    const response = await fetch(apiUrl);
    const reservations = await response.json();

    const reservationsContainer = document.getElementById('reservationsContainer');
    const updateNomeCliente = document.getElementById('updateNomeCliente');
    reservationsContainer.innerHTML = '';

    // Limpar as opções do select de atualização
    updateNomeCliente.innerHTML = '<option value="">Selecione um cliente</option>';

    if (reservations.length === 0) {
      reservationsContainer.innerHTML = '<p>Nenhuma reserva encontrada.</p>';
    } else {
      reservations.forEach((reservation) => {
        const reservationElement = document.createElement('div');
        reservationElement.classList.add('reservation-item');
        reservationElement.innerHTML = `
          <h3>${reservation.nomeCliente}</h3>
          <p>Mesa: ${reservation.numeroMesa}</p>
          <p>Status: ${reservation.status}</p>
          <p>Contato: ${reservation.contatoCliente}</p>
          <button class="delete-button" onclick="excluirReserva('${reservation._id}')">Excluir Reserva</button>
        `;
        reservationsContainer.appendChild(reservationElement);

        // Adicionar a reserva no select para atualização
        const option = document.createElement('option');
        option.value = reservation._id;
        option.textContent = reservation.nomeCliente;
        updateNomeCliente.appendChild(option);
      });
    }
  } catch (err) {
    console.error('Erro ao carregar reservas:', err);
  }
}

// Função para excluir uma reserva
async function excluirReserva(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      loadReservations();
    } else {
      alert('Erro ao excluir a reserva: ' + data.message);
    }
  } catch (err) {
    console.error('Erro ao excluir reserva:', err);
  }
}

// Função para atualizar uma reserva
document.getElementById('updateReservationForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('updateNomeCliente').value; // Usamos o ID da reserva selecionada
  const status = document.getElementById('updateStatus').value;
  const contatoCliente = document.getElementById('updateContato').value;

  const updatedReservation = {
    status,
    contatoCliente,
  };

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReservation),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      loadReservations();
    } else {
      alert('Erro ao atualizar a reserva: ' + data.message);
    }
  } catch (err) {
    console.error('Erro ao atualizar reserva:', err);
  }
});

//
