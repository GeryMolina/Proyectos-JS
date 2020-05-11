//this con Implicit binding

const usuario = {
    nombre :'Juan',
    edad : 20,
    presentacion( ) {
        console.log(`Mi nombre es ${this.nombre} y tengo ${this.edad} años`)
    },
    mascota: {
        nombre :'Hook',
        edad : 2,
        presentacion( ) {
        console.log(`Mi nombre es ${this.nombre} y tengo ${this.edad} años`)
        }
    }
}
usuario.presentacion()
usuario.mascota.presentacion()