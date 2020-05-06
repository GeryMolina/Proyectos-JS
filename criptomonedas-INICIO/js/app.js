//Instanciar Clases
const api = new API('5572475e9c8c7fd190589cfb5eb6503fdf391dc549aad4d00a83486188eb4ef7');
const ui = new Interfaz();


//Leer el formulario 

const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', (e) => { 
    e.preventDefault();
    
    //Leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSelecionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    //Leer cripto moneda
    const criptoSelect = document.querySelector('#criptomoneda');
    const criptoSelecionada = criptoSelect.options[criptoSelect.selectedIndex].value;

    //Comprobar que ambos campos tengan datos seleccionada
    if(monedaSelecionada === '' || criptoSelecionada === ''){
        ui.mostrarMensaje('Ambos campo son obligatorios', 'alert bg-danger text-center');
    }else{
        api.obtenerValores(monedaSelecionada, criptoSelecionada)
        .then( data => {
            ui.mostrarResultado(data.resultado.RAW, monedaSelecionada, criptoSelecionada); 
        })
    }

})