import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const usuario = localStorage.getItem("usuario");

if (!usuario) {
  window.location.href = "index.html";
}

document.getElementById("usuario").innerText = usuario;

// SAIR
function sair() {
  window.location.href = "sair.html";
}

window.sair = sair;

// CRIAR TAREFA
async function criarTarefa() {
  const titulo = document.getElementById("titulo").value;

  const descricao = document.getElementById("descricao").value;

  const data = document.getElementById("data").value;

  const materia = document.getElementById("materia").value;

  const prioridade = document.getElementById("prioridade").value;

  if (titulo === "") {
    alert("Digite um título.");

    return;
  }

  try {
    await addDoc(collection(db, "tarefas"), {
      titulo,
      descricao,
      data,
      materia,
      prioridade,
      status: "afazer",
    });

    limparCampos();

    carregarTarefas();
  } catch (erro) {
    console.log(erro);

    alert("Erro ao salvar tarefa.");
  }
}

window.criarTarefa = criarTarefa;

// LIMPAR CAMPOS
function limparCampos() {
  document.getElementById("titulo").value = "";

  document.getElementById("descricao").value = "";

  document.getElementById("data").value = "";

  document.getElementById("materia").value = "";
}

// ATUALIZAR ENTREGAS
function atualizarEntregas(listaTarefas) {
  const entregas = document.getElementById("proximasEntregas");

  entregas.innerHTML = "";

  const hoje = new Date();

  let encontrou = false;

  listaTarefas.forEach((tarefa) => {
    if (!tarefa.data) return;

    const dataEntrega = new Date(tarefa.data);

    const diferenca = dataEntrega - hoje;

    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));

    // MOSTRA TAREFAS DOS PRÓXIMOS 7 DIAS
    if (dias >= 0 && dias <= 7) {
      encontrou = true;

      const item = document.createElement("div");

      item.classList.add("entrega-item");

      item.innerHTML = `

        <strong>
          ${tarefa.titulo}
        </strong>

        <span>
          📚 ${tarefa.materia}
        </span>

        <small>
          📅 ${tarefa.data}
        </small>

      `;

      entregas.appendChild(item);
    }
  });

  // SEM TAREFAS
  if (!encontrou) {
    entregas.innerHTML = `

      <p class="sem-entregas">
        Nenhuma tarefa próxima.
      </p>

    `;
  }
}

// CARREGAR TAREFAS
async function carregarTarefas() {
  document.getElementById("afazer").innerHTML = "";

  document.getElementById("andamento").innerHTML = "";

  document.getElementById("concluido").innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "tarefas"));

  const listaTarefas = [];

  querySnapshot.forEach((documento) => {
    const tarefa = documento.data();

    listaTarefas.push(tarefa);

    const card = document.createElement("div");

    card.classList.add("task-card");

    if (tarefa.prioridade === "Alta") {
      card.classList.add("alta");
    }

    if (tarefa.prioridade === "Média") {
      card.classList.add("media");
    }

    card.innerHTML = `

      <div class="task-top">

        <h3>${tarefa.titulo}</h3>

        <span>${tarefa.prioridade}</span>

      </div>

      <p>${tarefa.descricao}</p>

      <div class="task-info">

        <small>📚 ${tarefa.materia}</small>

        <small>📅 ${tarefa.data}</small>

      </div>

      <button onclick="excluirTarefa('${documento.id}')">
        Excluir
      </button>

    `;

    document.getElementById(tarefa.status).appendChild(card);
  });

  atualizarEntregas(listaTarefas);

  iniciarDrag();
}

// EXCLUIR TAREFA
async function excluirTarefa(id) {
  await deleteDoc(doc(db, "tarefas", id));

  carregarTarefas();
}

window.excluirTarefa = excluirTarefa;

// DRAG AND DROP
function iniciarDrag() {
  const listas = document.querySelectorAll(".task-list");

  listas.forEach((lista) => {
    new Sortable(lista, {
      group: "kanban",

      animation: 200,
    });
  });
}

// PESQUISA
document.getElementById("pesquisa").addEventListener("keyup", function () {
  const valor = this.value.toLowerCase();

  const tarefas = document.querySelectorAll(".task-card");

  tarefas.forEach((tarefa) => {
    tarefa.style.display = tarefa.innerText.toLowerCase().includes(valor)
      ? "block"
      : "none";
  });
});

// CARREGA TAREFAS
carregarTarefas();
