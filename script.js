const form = document.getElementById('form-tarefa');
const lista = document.getElementById('lista-tarefas');
const contador = document.getElementById('contador');

let tarefas = carregarTarefas(); // Carrega antes de tudo
renderizarTarefas(); // Renderiza ao carregar

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome-tarefa').value;
  const etiqueta = document.getElementById('etiqueta-tarefa').value;

  const novaTarefa = {
    id: Date.now(),
    nome,
    etiqueta,
    data: new Date().toLocaleDateString(),
    concluida: false
  };

  tarefas.push(novaTarefa);
  salvarTarefas(tarefas); // Salva após adicionar
  renderizarTarefas();     // Re-renderiza
  form.reset();
});

function renderizarTarefas() {
  lista.innerHTML = '';
  let concluidas = 0;

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    li.className = 'tarefa';
    if (tarefa.concluida) li.classList.add('concluida');

    li.innerHTML = `
  <div class="titulo">${tarefa.nome}</div>
  <span class="etiqueta">${tarefa.etiqueta}</span>
  <span class="data">Criado em: ${tarefa.data}</span><br>
  <button class="btn-concluir">${tarefa.concluida ? '✓' : 'Concluir'}</button>
  <button class="btn-excluir">🗑️ Excluir</button>
`;

// Botão de concluir
li.querySelector('.btn-concluir').addEventListener('click', () => {
  tarefa.concluida = !tarefa.concluida;
  salvarTarefas(tarefas);
  renderizarTarefas();
});

// Botão de excluir
li.querySelector('.btn-excluir').addEventListener('click', () => {
  tarefas.splice(index, 1); // remove a tarefa pelo índice
  salvarTarefas(tarefas);
  renderizarTarefas();
});


    lista.appendChild(li);
    if (tarefa.concluida) concluidas++;
  });

  contador.textContent = `${concluidas} tarefa${concluidas !== 1 ? 's' : ''} concluída${concluidas !== 1 ? 's' : ''}`;
}

// LocalStorage helpers
function salvarTarefas(tarefas) {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem('tarefas');
  return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
}
