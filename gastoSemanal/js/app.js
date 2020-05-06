//Variables
const presupuestoUsuario = prompt('¿Cúal es tu presupuesto?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

//Clases
//Clases de presupuesto 
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    //Metodo para ir restando de presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}
//Clase interfaz que muestra los datos en el DOM
class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');
        presupuestoSpan.innerHTML = `${cantidad} `;
        restanteSpan.innerHTML = `${cantidad} `
    }
    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert')

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        //Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //Quitar alert luego de 3 segundos
        setTimeout(function () {
            divMensaje.remove();
            formulario.reset();
        }, 3000)
    }
    agregarGastoListado(nombre, cantidad) {
        const listadoGastos = document.querySelector('#gastos ul');
        //Crear <li>
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center'
        li.innerHTML = `${nombre}
                    <span class="badge badge-primary badge-pill" >$ ${cantidad}</span>`;
        //insertar al HTML
        listadoGastos.appendChild(li);
    }
    //Comprueba el presupuesto restante 
    presupuestoRestante(cantidad) {
        const restante = document.querySelector('span#restante');
        //Leer presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML = `${presupuestoRestanteUsuario}`;
        this.comprobarPresupuesto()
    }
    //Cambia de Color el presupuesto restante
    comprobarPresupuesto() {
        const totalPresupuesto = cantidadPresupuesto.presupuesto;
        const totalRestante = cantidadPresupuesto.restante;
        //Comprobar el 25% 
        if ((totalPresupuesto / 4) > totalRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if ((totalPresupuesto / 2) > totalRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }

    }
}

//Listener
document.addEventListener('DOMContentLoaded', function () {
    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        //Instanciar un presupuesto 
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //Instanciar el Interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto)
    }
});
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    //Leer del formulario de gastos 
    const nombreGasto = document.getElementById('gasto').value;
    const cantidadGasto = document.getElementById('cantidad').value;

    //Instanciar la interfaz
    const ui = new Interfaz();

    //Comprobar que los campos no esten vacios 
    if (nombreGasto === '' || cantidadGasto === '') {
        // 2 parametros: mensaje y tipo
        ui.imprimirMensaje('Hubo un error', 'error');
    } else {
        //insertar en Html
        ui.imprimirMensaje('Gasto agregado', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
})