import '../css/style.css'

class Cliente {
    constructor(nombre) {
        this.nombre = nombre
    }
}

const cliente = new Cliente ('Lucia');
console.log(cliente)
console.log('Desde Nosotros')