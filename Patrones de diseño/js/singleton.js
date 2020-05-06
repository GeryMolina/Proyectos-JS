//En una sola instancia tengo todas las funciones relacionadas a un objeto

const alumnos = {
    // todos los alumnos    
    listaAlumnos: [],

    //obtener un alumno 
    get: function(id) {
        // console.log(id);
        return this.listaAlumnos[id]
    },

    //Crear un alumno
    crear: function(datos) {
        console.log(datos);
        this.listaAlumnos.push(datos);
    },

    //Listar todos los alumnos 
    listado: function() {
        return this.listaAlumnos;
    }
}

const alumno1 = {
    nombre: 'javier',
    edad: 20
}

const alumno2 = {
    nombre: 'Luis',
    edad: 25
}
alumnos.crear(alumno1);
alumnos.crear(alumno2);

const listado = alumnos.listado();
console.log(listado);

const alumno = alumnos.get(0);
console.log(alumno)
