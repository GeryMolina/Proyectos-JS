
document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

//Llamado a Ajax e imprimir resultados
function cargarNombres(e) {
    e.preventDefault();
    //Leer variables
    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const cantidad = document.getElementById('numero').value;

    let url = '';
    url += 'http://randomuser.me/api/?';

    //Si hay un origen agregarlo a la URL
    if(origenSeleccionado !== ''){
        url += `region=${origenSeleccionado}&`;
    }
    //Si hay un genero agregarlo a la URL
    if(generoSeleccionado !== ''){
        url += `gender=${generoSeleccionado}&`;
    }
    //si una cantidad agregarla a URL
    if(cantidad !== ''){
        url += `results=${cantidad}&`;
    }

    //Conectar con AJAX
    //Iniciar HMLHttpRequest
    const xhr = new XMLHttpRequest();
    //abrir la conexion 
    xhr.open('GET', url, true);
    //Datos e impresion del template 
    xhr.onload = function() {
        if(this.status === 200){
            console.log('este es'+ this.responseText);
            const nombres = JSON.parse(this.responseText);
            //Generar el HTML
            let htmlNombres = '<h2>Nombres Generados</h2>';
            htmlNombres += '<ul class="list">'
    
            //Imprimir nombres
            nombres.forEach(function(nombre) { 
                htmlNombres += `
                            <li>${nombre.name.first}
                `;
            })
            htmlNombres += '</ul>';
    
            document.getElementById('resultado').innerHTML = htmlNombres;
        }
       
    }
    //Enviar el Request
    xhr.send();

}