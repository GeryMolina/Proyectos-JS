const ui = new UI();

document.addEventListener('DOMContentLoaded', () =>{
    ui.mostrasEstablecimientos();
});

//Habilitar busqueda de establecimeintos

const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {
    if(buscador.value.length > 5){
        //Buscar en la api
        ui.obtenerSugerencias(buscador.value);
    } else {
        //mensaje 
        ui.mostrasEstablecimientos()
    }
})