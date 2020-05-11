const sumar= (a,b) => {
    return a + b
}
console.log(sumar.toString());

function Automovil (modelo, color) {
    this.modelo = modelo;
    this.color = color;
}

Automovil.prototype.toString = function autoString(){
    const datos = `Auto: ${this.modelo} color: ${this.color}`
    return datos
}
const auto = new Automovil('Camaro', 'rojo');
console.log( auto.toString() )