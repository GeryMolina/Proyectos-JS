// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBTN = document.getElementById('vaciar-carrito');

//Listener

cargarListeners();

function cargarListeners() {
    //Dispara cuando se presiona agregar carrito 
    cursos.addEventListener('click', comprarCurso);
    //Eliminar curso de carrito
    carrito.addEventListener('click', eliminarCurso);
    // vaciar Carrito
    vaciarCarritoBTN.addEventListener('click', vaciarCarrito);
    // Al cargar el documento, mostrar datos de LS
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}


//Funciones
//funcion que añade cursos al carrito
function comprarCurso(e) {
    e.preventDefault();
    //Delegation para agregar carrito 
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        //enviamos curso seleccionado para tomar sus datos
        leerDatosCursos(curso);

    }
}
//lee los datos del curso
function leerDatosCursos(curso) {
    const infocurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infocurso);
}

//muestra curso seleccionado en el carrito
function insertarCarrito(infocurso) {
    const row = document.createElement('tr');
    row.innerHTML = `
                <td><img src="${infocurso.imagen}" width=100></td>
                <td>${infocurso.titulo} </td>
                <td>${infocurso.precio} </td>
                <td> <a href="#" class= "borrar-curso" data-id="${infocurso.id}">X</a> </td>
     `;
    listaCursos.appendChild(row);
    guardarEnLocalStorage(infocurso);
}
//Eliminar curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();
    let curso,
        cursoID

    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoID = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoID)
}
//Elimina todos los cursos del carrito en el Dom
function vaciarCarrito() {
    //forma Lenta
    //listaCursos.innerHTML='';
    //forma rapida y recomendada
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild)
    }
   // vaciar LS
    vaciarLS();
    //genera un corte en la funcion
    return false
}
// almacena cursos del carrito en local storage
function guardarEnLocalStorage(infocurso) {
    let cursos;
    //toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursosLocalStorage();
    //El curso seleccionado se agrega al arreglo
    cursos.push(infocurso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}
// Comprueba que haya elementos en local Storage
function obtenerCursosLocalStorage() {
    let cursosLS;

    //Comprobamos si hay algo en el local Storage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

//Imprime los datos de local Storage en el carrito 
function leerLocalStorage() {
    let cursosLS;
    //toma el valor de un arreglo con datos de LS o vacio
    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function (infocurso) {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td><img src="${infocurso.imagen}" width=100></td>
                <td>${infocurso.titulo} </td>
                <td>${infocurso.precio} </td>
                <td> <a href="#" class= "borrar-curso" data-id="${infocurso.id}">X</a> </td>
     `;
        listaCursos.appendChild(row);
    })

}
//eliminar cursos del Local Storage
function eliminarCursoLocalStorage(cursoID) {
    let cursosLS;
    //Obtenemos arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    //Iteramos comparando el id del carrito con el de LS
    cursosLS.forEach(function (curso, index) {
        if (curso.id === cursoID) {
            cursosLS.splice(index, 1)
        }
    })
    //añadimos arreglo actual a storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS))
}

function vaciarLS() {
    localStorage.clear();
}