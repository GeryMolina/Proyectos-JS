//this con explicit binding

function persona(el1, el2) {
    console.log(`Hola soy ${this.nombre} y soy ${this.trabajo}, me gusta el ${el1} y la ${el2}`)
}
const informacion = {
    nombre: 'Juan',
    trabajo: 'Programador'
}
const musica = ['Rock', 'Cumbia']
//Explicit binding con call cuando pasas el arreglo debes colocar todas las posiciones
persona.call(informacion, musica[0], musica[1]);

////Explicit binding con Apply, solo pasas el arreglo
persona.apply(informacion, musica);

//Explicit binding
const nuevaFn = persona.bind(informacion, musica[0], musica[1]);
nuevaFn();