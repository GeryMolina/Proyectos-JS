class Playlist {
    constructor(nombre) {
        this.nombre = nombre;
    }
    play() {
        console.log(`Reproduciendo la play list ${this.nombre}`)
    }
    delete() {
        console.log(`Eliminando la play list ${this.nombre}`)
    }
}

const playlist = new Playlist('Rock Latino');
const playlist2 = new Playlist('Rock 80s');

console.log(playlist);
console.log(playlist2);

playlist.play();
playlist2.play();

playlist.delete();
playlist2.delete(); 