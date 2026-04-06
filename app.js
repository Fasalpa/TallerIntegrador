let tareas = [];
let contadorTareas = 0;
let validador = false;

let nuevaTarea = document.getElementById("nuevaTarea");
let listaCategorias = document.getElementById("listaCategorias");
let btnAgregar = document.getElementById("btnAgregar");
let nuevaCategoria = document.getElementById("nuevaCategoria");
let mensajeError = document.getElementById("mensajeError");
let mensajeCategoria = document.getElementById("mensajeCategoria");
let mensajeInput = document.getElementById("mensajeInput");

listaCategorias.addEventListener("click", function () {
  if (listaCategorias.value === "otra") {
    nuevaCategoria.style.display = "block";
  } else {
    nuevaCategoria.style.display = "none";
  }
});

function validarCampo() {
  if (nuevaTarea.value.trim() === "") {
    mensajeError.style.display = "block";
    validador = false;
  } else {
    validador = true;
    mensajeError.style.display = "none";
  }
}

function validarCartegoria() {
  if (listaCategorias.value === "") {
    mensajeCategoria.style.display = "block";
    validador = false;
  } else {
    mensajeCategoria.style.display = "none";
    validador = true;
  }
}

function validarOtra() {
  if (nuevaCategoria.value.trim() === "" && listaCategorias.value === "otra") {
    mensajeInput.style.display = "block";
    validador = false;
  } else {
    mensajeInput.style.display = "none";
  }
}

function agregarTarea() {
  validarCampo();
  validarCartegoria();
  validarOtra();

  if (validador === true) {
    console.log("Se agregó la tarea");
  } else {
    console.log("No se agregó la tarea.");
  }
}
