//HERENCIA VIA PROTOTYPE

function Playlist(nombre){
    this.nombre = nombre;
};

Playlist.prototype.play = function() {
    console.log(`Reproduciendo la play list ${this.nombre}`)
};
Playlist.prototype.delete = function() {
    console.log(`Eliminando la play list ${this.nombre}`)
};

//HERENCIA
function Cancion(nombre, genero) {
    Playlist.call(this, nombre);
    this.genero = genero;
}
//Se clonan los prototipos de la clases playlist// Heredar los metodos
Cancion.prototype = Object.create(Playlist.prototype)

const cancion = new Cancion('Tu y Yo', 'Pop');
const playlist = new Playlist('Rock Latino');

cancion.play();
playlist.play();


