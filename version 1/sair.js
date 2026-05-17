import "./firebase.js";

import {
  getAuth,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
const auth = getAuth();

// ENCERRA SESSÃO
function encerrarSessao() {
  localStorage.removeItem("usuario");

  window.location.href = "index.html";
}

window.encerrarSessao = encerrarSessao;

// VOLTAR
function voltarSistema() {
  window.location.href = "kanban.html";
}

window.voltarSistema = voltarSistema;

// INATIVAR CONTA
async function inativarConta() {
  try {
    const usuarioAtual = auth.currentUser;

    await deleteUser(usuarioAtual);

    localStorage.removeItem("usuario");

    alert("Conta inativada.");

    window.location.href = "index.html";
  } catch (erro) {
    console.log(erro);

    alert("Erro ao inativar conta.");
  }
}

window.inativarConta = inativarConta;
