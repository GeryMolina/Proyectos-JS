//instanciar ambas clases 
const eventbrite = new Eventbrite();
const ui = new Interfaz();

//listener a btn

document.getElementById('buscarBtn').addEventListener('click', (e) => {
    e.preventDefault()

    //Leer el texto del input buscar
    const textoBuscador = document.getElementById('evento').value;
    //Leer el select 
    const categorias = document.getElementById('listado-categorias');
    const categoriaSeleccionada = categorias.options[categorias.selectedIndex].value;

    console.log(textoBuscador);
    console.log(categoriaSeleccionada);

    //revisar que el buscador tenga texto 
    if (textoBuscador !== '') {
        //consultar a los eventos 
        eventbrite.obtenerEventos(textoBuscador, categoriaSeleccionada)
            .then(eventos => {
                if (eventos.eventos.events.length > 0) {
                    ui.limpiarResultados();
                    ui.mostrarEventos(eventos.eventos)
                } else {
                    //No hay eventos mostrar evento
                    ui.mostrarMensaje('No hay Resultados', 'alert alert-danger mt-4');
                }
            })
    } else {
        //crear metodo para mostrar mensaje de error
        ui.mostrarMensaje('Escribe en el buscador', 'alert alert-danger mt-4')
    }

})