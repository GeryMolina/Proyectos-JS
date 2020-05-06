class Interfaz {
    constructor() {
        //Inicializa la App al instanciar
        this.init();
        //Leer el resultado 
        this.listado = document.getElementById('resultado-eventos');
    }
    //Metodo para cuando inicialice la App
    init() {
        //llamar imprimir categorias de Rest Api
        this.imprimirCategorias()
    }
    //Imprimir categorias
    imprimirCategorias() {
        const listaCategorias = eventbrite.obtenerCategorias()
            .then(categorias => {
                const cats = categorias.categorias.categories;
                console.log(cats);
                //Traer select de categorias
                const selectCategorias = document.getElementById('listado-categorias');

                //Recorremos arreglo e impormimos los option
                cats.forEach(cat => {
                    const option = document.createElement('option');
                    option.value = cat.id;
                    option.appendChild(document.createTextNode(cat.name_localized));
                    selectCategorias.appendChild(option)
                })
            })

    }
    //Lee la respuesta de la Api e imprime resultados 
    mostarEventos(eventos) {
        //Leer eventos y agregarlos a una variable 
        const listaEventos = eventos.events;
        //resorrer los eventos y crear su template
        listaEventos.forEach(evento => {
            this.listado.innerHTML = `
                <div class="col-md-4 mb-4"> 
                     <div class="card"> 
                            <img class="img-fluid mb-2" src="${evento.logo !==null? evento.logo.url : '' }">
                         <div class="card-body"> 
                            <div class="card-text"> 
                                <h2 class="text-center">${evento.name.text}</h2>
                                <p class="lead text-info">Información evento</p>
                                <p>${evento.description.text.substring(0,280)}
                                ...</p>

                                <span class="badge badge-primary">Capacidad del evento :${evento.capacity}</span>
                                <span class="badge badge-secondary">Fecha y hora :${evento.start.local}</span>
                                <a href="${evento.url}" target="_blank" class="btn btn-primary btn-block mt-4">
                                Comprar Boleto</a>
                             </div>

                         </div>
                    </div>
                </div>
            `
        })

    }
    //Limpiar resultados previos 
    limpiarResultados(){
        this.listado = '';
    }
    //Metodo para imprimir memsaje : 2 parametros mensaje y clase
    mostrarMensaje(mensaje, clase) {
        const div = document.createElement('div');
        //agregar clase
        div.classList = clase;
        //Agregar texto
        div.appendChild(document.createTextNode(mensaje));
        //Añadir a padre
        const buscadorDiv = document.getElementById('buscador');
        buscadorDiv.appendChild(div);
        setTimeout(() => {
            this.limpiarMensaje();
        }, 3000)
    }
    //Desaparece mensaje en caso de que exista 
    limpiarMensaje() {
        const alert = document.querySelector('.alert');
        if (alert) {
            alert.remove()
        }
    }
}