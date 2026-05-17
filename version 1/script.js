import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

async function cadastrar() {
  const email = document.getElementById("email").value;

  const senha = document.getElementById("senha").value;

  if (email === "" || senha === "") {
    alert("Preencha todos os campos.");

    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, senha);

    localStorage.setItem("usuario", email);

    alert("Conta criada com sucesso!");

    window.location.href = "kanban.html";
  } catch (erro) {
    console.log(erro);

    alert("Erro ao cadastrar.");
  }
}

async function login() {
  const email = document.getElementById("email").value;

  const senha = document.getElementById("senha").value;

  if (email === "" || senha === "") {
    alert("Preencha todos os campos.");

    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, senha);

    localStorage.setItem("usuario", email);

    window.location.href = "kanban.html";
  } catch (erro) {
    console.log(erro);

    alert("E-mail ou senha inválidos.");
  }
}

window.login = login;

window.cadastrar = cadastrar;
