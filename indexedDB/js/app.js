//declarro funcion global de la base de datos
let DB;

//Llamo a todos los selectores de la interfaz
const form = document.querySelector('form');
const nombreMascota = document.getElementById('mascota');
const nombreDueno = document.getElementById('cliente');
const telefono = document.getElementById('telefono');
const fecha = document.getElementById('fecha');
const hora = document.getElementById('hora');
const sintomas = document.getElementById('sintomas');
const citas = document.getElementById('citas');
const headingAdmninstra = document.getElementById('administra');

//Esperar por el DOm Ready
document.addEventListener('DOMContentLoaded', () => {
    //Crear la base de datos(primer parametro nombre y segundo version, solo admite nº enteros)
    let crearDB = window.indexedDB.open('citas', 1);

    //Si hay error enviarlo a la consola
    crearDB.onerror = () => {
        console.log('existe un error')
    }

    //Si todo esta ok entonces muestra en consola y asigna base de datos
    crearDB.onsuccess = () => {
        // console.log('todo ok');

        //Asignar a la base de datos 
        DB = crearDB.result;
        // console.log(DB);

        mostrarCitas();
    }

    //Este metodo solo corre una vez y es ideal para crear el Schema de la base de datos
    crearDB.onupgradeneeded = (e) => {
        //El evento que corre este elemento es la misma base de datos 
        let db = e.target.result;
        console.log(db);

        //definir el objectStore, toma 2 parametros: el nombre de la BD y las opciones
        //keypath es el indice  de la base de datos
        let objectStore = db.createObjectStore('citas', { keyPath: 'key', autoIncrement: true });

        //Crear los indices y los campos de la base de datos, createIndex(3 parametros): nombre, keyPath y opciones
        objectStore.createIndex('mascota', 'mascota', { unique: false });
        objectStore.createIndex('cliente', 'cliente', { unique: false });
        objectStore.createIndex('telefono', 'telefono', { unique: false });
        objectStore.createIndex('fecha', 'fecha', { unique: false });
        objectStore.createIndex('hora', 'hora', { unique: false });
        objectStore.createIndex('sintomas', 'sintomas', { unique: false });
    }

    //Creo funcion para rescatar el valor de los campos en un objeto
    const agregarDatos = (e) => {
        e.preventDefault();
        //creo el objeto 
        const nuevaCita = {
            mascota: nombreMascota.value,
            cliente: nombreDueno.value,
            telefono: telefono.value,
            fecha: fecha.value,
            hora: hora.value,
            sintomas: sintomas.value
        }
        // console.log(nuevaCita)
        //En IndexedDB se utilizan las transacciones, recibe 2 parametros, el nombre de la base de datos y el modo
        let transaction = DB.transaction(['citas'], 'readwrite');
        //Se crea otro objectStore ahora para insertar los datos en la base de datos
        let objectStore = transaction.objectStore('citas');
        // console.log(objectStore)
        //envio los datos del objeto a la base de datos
        let peticion = objectStore.add(nuevaCita);
        console.log(peticion);

        peticion.onsuccess = () => {
            form.reset();
        }
        transaction.oncomplete = () => {
            console.log('cita agregada');
            //se vuelve a ejecutar aca para que muestre los nuevos datos agregados 
            mostrarCitas();
        }
        transaction.onerror = () => {
            console.log('Hubo un error');
        }

    }
    //Cuando se envie el formulario 
    form.addEventListener('submit', agregarDatos);

    //Mostrar citas de la base de datos en el HTML
    const mostrarCitas = () => {
        //limpiamos citas anteriores
        while (citas.firstChild) {
            citas.remove(citas.firstChild);
        }

        //Cada vez que queramos trabajar con la base de datos tnemos que declarar el objectStore
        let objectStore = DB.transaction('citas').objectStore('citas');
        //esto retorna una peticion que tenemos que abrir con open cursor
        //el cursor lo que hace es que recorre cada uno de los registro que tengas en la base de datos

        objectStore.openCursor().onsuccess = (e) => {
            //cursor se va a ubicar en el registro indicado para acceder a los datos
            let cursor = e.target.result;
            // console.log(cursor)
            if (cursor) {
                let citasHTML = document.createElement('li');
                citasHTML.setAttribute('data-cita-id', cursor.value.key);
                citasHTML.classList.add('list-group-item');

                citasHTML.innerHTML = `
                    <p class='font-weigth-bold'>Mascota: <span class='font-weigth-normal'>${cursor.value.mascota}</span></p>
                    <p class='font-weigth-bold'>Dueño: <span class='font-weigth-normal'>${cursor.value.cliente}</span></p>
                    <p class='font-weigth-bold'>Teléfono: <span class='font-weigth-normal'>${cursor.value.telefono}</span></p>
                    <p class='font-weigth-bold'>Fecha: <span class='font-weigth-normal'>${cursor.value.fecha}</span></p>
                    <p class='font-weigth-bold'>Hora: <span class='font-weigth-normal'>${cursor.value.hora}</span></p>
                    <p class='font-weigth-bold'>Síntomas: <span class='font-weigth-normal'>${cursor.value.sintomas}</span></p>
                `;
                //Crear boton borrar
                const botonBorrar = document.createElement('button');
                botonBorrar.classList.add('borrar', 'btn', 'btn-danger');
                botonBorrar.innerHTML = '<span aria-hidden="true">x</span> Borrar';
                botonBorrar.onclick = borrarCita;
                citasHTML.appendChild(botonBorrar);

                //append en el padre
                citas.appendChild(citasHTML);

                //le tenemos que decir al cursor que continue ya que en caso de que tenga mas registros, recorra los siguientes
                cursor.continue();
            } else {
                if (!citas.firstChild) {
                    //Cuando no hay registros 
                    headingAdmninstra.textContent = 'Agrega citas para comenzar';
                    let listado = document.createElement('p');
                    listado.classList.add('text-center');
                    listado.textContent = 'No hay registros'
                    citas.appendChild(listado)
                } else {
                    headingAdmninstra.textContent = 'Administra tus citas';
                }
            }
        }

    }
    const borrarCita = (e) => {
        let citaID = Number(e.target.parentElement.getAttribute('data-cita-id'));
        //En IndexedDB se utilizan las transacciones, recibe 2 parametros, el nombre de la base de datos y el modo
        let transaction = DB.transaction(['citas'], 'readwrite');
        //Se crea otro objectStore ahora para insertar los datos en la base de datos
        let objectStore = transaction.objectStore('citas');
        // console.log(objectStore)
        //envio los datos del objeto a la base de datos
        let peticion = objectStore.delete(citaID);

        transaction.oncomplete = () => {
            e.target.parentElement.parentElement.removeChild(e.target.parentElement);
            console.log(`Se elimina la cita con el ID:${citaID}`);
            if (!citas.firstChild) {
                //Cuando no hay registros 
                headingAdmninstra.textContent = 'Agrega citas para comenzar';
                let listado = document.createElement('p');
                listado.classList.add('text-center');
                listado.textContent = 'No hay registros'
                citas.appendChild(listado)
            } else {
                headingAdmninstra.textContent = 'Administra tus citas';
            }
        }
    }
})

