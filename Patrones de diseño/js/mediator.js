//Es un intermediario que se comunica con distintos tipos de objetos, a diferencia del observer que define un 
//objeto global, este define objetos ya localizados para un objetivo muy especifico

const Vendedor = function(nombre){
    this.nombre = nombre;
    this.sala = null;
}
const Comprador = function(nombre){
    this.nombre = nombre;
    this.sala = null;
}

Vendedor.prototype = {
    oferta: function(articulo, precio) {
        console.log(`Tenemos el siguiente articulo ${articulo}, iniciamos en ${precio}`);
    }, 
    vendido: function(comprador){
        console.log(`Vendido a ${comprador}`)
    }
}
Comprador.prototype = {
    oferta: function(comprador, mensaje) {
        console.log(`${comprador.nombre}: ${mensaje}`)
    }
} 

const Subasta = function() {
    let compradores = [];
    return{
        registrar: function(usuario) {
            compradores[usuario.nombre] = usuario;
            usuario.sala = this;
           
        }
    }
}
//Instanciar las clases 

const juan = new Comprador('Juan');
const laura = new Comprador('Laura');
const jose = new Comprador('Jose');

const vendedor = new Vendedor('Vendedor');

const subasta = new Subasta();
//entran a la subasta
subasta.registrar(juan);
subasta.registrar(laura);
subasta.registrar(jose);

vendedor.oferta('Mustang 1966', 3000);
juan.oferta(4000, juan);
laura.oferta(5000, laura);
jose.oferta(10000, jose);

vendedor.vendido(karen.nombre);