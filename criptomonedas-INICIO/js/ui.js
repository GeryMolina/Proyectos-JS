
class Interfaz {
    constructor() {
        this.init();
    }
    init() {
        this.construirSelect();
    }
    construirSelect() {
        api.obtenerMonedasAPI()
            .then(monedas => {
                const select = document.querySelector('#criptomoneda')
                //operador nuevo de for donde podemos acceder al Value o la Key del objeto
                //Object.entries nos permite pasar un objeto a arreglo
                for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                    //añadir el Symbol y el nombre como opciones
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion)
                }
            })
    }

    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        //Seleccionar mensaje
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);
        //Mostrar contenido
        setTimeout(() => {
            div.remove();
        }, 3000)
    }

    //Imprimer resultado de la cotizacion

    mostrarResultado(resultado, moneda, cripto) {
        //en caso de un resultado anterior, ocultarlo
        const resultadoAnterior = document.querySelector('#resultado > div');
        if(resultadoAnterior) {
            resultadoAnterior.remove();
        }

        const datosMoneda = resultado[cripto][moneda];
        //recortar digitos del precio 
        const precio = datosMoneda.PRICE.toFixed(2);
        const porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2)
        //tranformar valor de ultima actualización || toLocaleString nos sirve para poder adecuar la fecha respecto al lugar donde vivimos
        const actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-CL')
        //construir tempate
        let template = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $${precio}</p>
                    <p>Variación último día: %${porcentaje}</p>
                    <p>Última actualización: ${actualizado}</p>
                </div>
            </div>
        `
        this.mostrarSpinner('block');

        setTimeout(() => {
            //insertar resultado
            document.querySelector('#resultado').innerHTML = template;
            //ocultar Spinner
            this.mostrarSpinner('none');

        }, 3000)

    }
    //Mostrar Spinner de carga al enviar la cotización
    mostrarSpinner(vista) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;


    }

}