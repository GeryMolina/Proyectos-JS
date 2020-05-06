//Es una patrón de comportamiento. Tambien se le conoce como suscriptor-publicador 

let observer = {
    obtenerOfertas: function (callback) {
        if (typeof callback === 'function') {
            this.subscribers[this.subscribers.length] = callback;
        }
    },
    cancelarOfertas: function(callback) {
        for(let i = 0; i < this.subscribers.length; i++) {
            if(this.subscribers[i] === callback){
                delete this.subscribers[i];
            }
        }
    },
    publicarOferta : function (oferta) {
        for(let i = 0; i < this.subscribers.length; i++) {
            if(typeof this.subscribers[i] === 'function'){
                this.subscribers[i](oferta);
            }
        }
    },
    crear: function(objeto) {
        for(let i in this) {
            objeto[i] = this[i];
            objeto.subscribers = [];
        }
    }
}

//Vendedor

const udemy = {
    nuevoCurso : function() {
        const curso = 'Un nuevo curso de JS';
        this.publicarOferta(curso)
    }
}
const facebook = {
    nuevoAnuncio : function() {
        const oferta = 'Comprar celular';
        this.publicarOferta(oferta)
    }
}

//Crear publicadores
observer.crear(udemy);
observer.crear(facebook);

//crear suscriptores

const juan = {
    compartir: function(oferta) {
        console.log('Juan: Excelente oferta ' + oferta)
    }
}
const karen = {
    interesa: function(oferta) {
        console.log('Karen: Me interesa la oferta de ' + oferta)
    }
}
//suscripcion al publicador
udemy.obtenerOfertas( juan.compartir );
udemy.obtenerOfertas( karen.interesa );
//crea el nuevo curso
udemy.nuevoCurso();
//Se elimina suscripcion al curso
udemy.cancelarOfertas(karen.interesa);
//Se crea nuevo curso
udemy.nuevoCurso();

//Se suscriben a la publicaciones
facebook.obtenerOfertas( karen.interesa );
facebook.obtenerOfertas( juan.compartir );
//se crea la publicación
facebook.nuevoAnuncio();