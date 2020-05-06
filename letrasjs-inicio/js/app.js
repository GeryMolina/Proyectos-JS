import * as UI from './interfaz.js';
import { API } from './api.js'

UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    //Obtener datos del formulario
    const artista = document.getElementById('artista').value;
    const cancion = document.getElementById('cancion').value;

    if (artista === '' || cancion === '') {
        UI.divMensaje.innerHTML = 'Todos los campos son obligatorios';
        UI.divMensaje.classList.add('error');
        setTimeout(() => {
            UI.divMensaje.innerHTML = '';
            UI.divMensaje.classList.remove('error');
        }, 3000)
    } else {
        //el Formulario esta completo, realizar consulta a la api
        const api = new API(artista, cancion);
        api.consultarAPI()
            .then(data => {
                if (data.data.lyrics) {
                    const letra = data.data.lyrics;
                    UI.divResultado.textContent = letra;
                    UI.divResultado.classList
                } else {
                    UI.divMensaje.innerHTML = 'No existe canción, prueba con otra busqueda';
                    UI.divMensaje.classList.add('error');
                    setTimeout(() => {
                        UI.divMensaje.innerHTML = '';
                        UI.divMensaje.classList.remove('error');
                        UI.formularioBuscar.reset();
                        
                    }, 3000)
                }
            })
    }
})
