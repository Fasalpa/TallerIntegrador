let tareas = [];
let contadorTotalTareas = 0;
let validador = false;

let nuevaTarea = document.getElementById("nuevaTarea");
let listaCategorias = document.getElementById("listaCategorias");
let btnAgregar = document.getElementById("btnAgregar");
let nuevaCategoria = document.getElementById("nuevaCategoria");
let mensajeError = document.getElementById("mensajeError");
let mensajeCategoria = document.getElementById("mensajeCategoria");
let mensajeInput = document.getElementById("mensajeInput");
let tareaAgregada = document.getElementById("tareaAgregada");
let listaTareas = document.getElementById("listaTareas");
let numeroHechas = document.getElementById("numeroHechas");
let totalTareas = document.getElementById("totalTareas");

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

function mensajeAgregado() {
  if (validador === true && nuevaTarea.value.trim() != "") {
    tareaAgregada.style.display = "block";
  } else {
    console.log("No se agregó la tarea.");
    tareaAgregada.style.display = "none";
  }
}

function crearTarjetaTarea(tarea) {
  let label = document.createElement("label");
  label.classList.add("itemTarea");
  let creacionInput = document.createElement("input");
  creacionInput.type = "checkbox";
  /// crear el span para que no queden pegados los textos ome.
  let contenedorTexto = document.createElement("div");
  contenedorTexto.classList.add("contenedorTextoTarea");
  let spanTexto = document.createElement("span");
  spanTexto.classList.add("texto-tarea");
  spanTexto.textContent = ` ${tarea.tarea}\n`;

  let spanCategoria = document.createElement("span");
  spanCategoria.classList.add("categoria-tarea");
  spanCategoria.textContent = ` Categoría: ${tarea.categoria}`;

  if (tarea.categoria === "urgente") {
    label.classList.add("categoria-urgente");
  }

  let botonEliminar = document.createElement("button");
  botonEliminar.textContent = "🗑️";
  botonEliminar.classList.add("btn-eliminar-tarea");

  creacionInput.addEventListener("change", function () {
    if (this.checked) {
      tarea.estado = true;
      label.style.textDecoration = "line-through";
      label.style.opacity = "0.2";
    } else {
      tarea.estado = false;
      label.style.textDecoration = "none";
      label.style.opacity = "1";
    }

    modificadorContadorTareasCompletadas();
  });

  botonEliminar.addEventListener("click", function (event) {
    event.stopPropagation();
    label.remove();

    let posicion = tareas.indexOf(tarea);

    if (posicion > -1) {
      tareas.splice(posicion, 1);
    }
    modificadorContadorTareasCompletadas();
    modificarContadorTareas();
  });

  label.appendChild(creacionInput);
  contenedorTexto.appendChild(spanTexto);
  contenedorTexto.appendChild(spanCategoria);
  label.appendChild(contenedorTexto);
  label.appendChild(botonEliminar);
  listaTareas.appendChild(label);
}

function agregarTarea() {
  validarCampo();
  validarCartegoria();
  validarOtra();

  let categoria =
    listaCategorias.value === "otra"
      ? nuevaCategoria.value
      : listaCategorias.value;

  if (validador === true && nuevaTarea.value.trim() != "") {
    let objetoTarea = {
      tarea: nuevaTarea.value,
      categoria: categoria,
      estado: false,
    };
    tareas.push(objetoTarea);
    crearTarjetaTarea(objetoTarea);
    modificarContadorTareas();
  } else {
    console.log("No se agregó la tarea.");
  }
  mensajeAgregado();
}

function modificarContadorTareas() {
  contadorTotalTareas = tareas.length;
  totalTareas.textContent = contadorTotalTareas;
}

function modificadorContadorTareasCompletadas() {
  let contador = 0;

  tareas.forEach(function (tarea) {
    if (tarea.estado === true) {
      contador++;
    }
  });

  numeroHechas.textContent = contador;
}
