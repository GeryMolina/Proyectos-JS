//Clases y Prototype

function Playlist(nombre){
    this.nombre = nombre;
};

Playlist.prototype.play = function() {
    console.log(`Reproduciendo la play list ${this.nombre}`)
};
Playlist.prototype.delete = function() {
    console.log(`Eliminando la play list ${this.nombre}`)
};

const playlist = new Playlist('Rock Latino');
const playlist2 = new Playlist('Rock 80s');

console.log(playlist);
console.log(playlist2);

playlist.play();
playlist2.play();

playlist.delete();
playlist2.delete(); 