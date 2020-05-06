function ConstructorSitios() {
    this.crearElemento = function(texto, tipo) {
        let html;

        if(tipo === 'input'){
            html = new InputHTML(texto);
        } else if(tipo === 'img'){
            html = new ImgHTML(texto);
        } else if(tipo === 'h1'){
            html = new HeadingHTML(texto);
        } else if(tipo === 'p'){
            html = new ParrafoHTML(texto);
        }
        //al instanciarla acá no se debe poner en el constructor de cada uno de las objetos
        this.tipo = tipo;

        html.mostrar = function() {
            const elemento = document.createElement(this.tipo);

            if(tipo === 'input'){
                elemento.setAttribute('placeholder', this.texto);
            } else if(tipo === 'img'){
                elemento.setAttribute('src', this.texto);
            } else {
                elemento.appendChild(document.createTextNode(this.texto))
            }
            document.querySelector('#app').appendChild(elemento);
        }
        return html
    }
}
//La idea del factory es que no se sabe que clase se va a instanciar pero cuando se ejecute 
//tener distintos tipos de datos que se pueden generar cuando se ejecute el programa


//Crear objetos instanciados 
const HeadingHTML = function(texto){
    this.texto = texto;
}
const InputHTML = function(texto){
    this.texto = texto;
}
const ImgHTML = function(texto){
    this.texto = texto;
}
const ParrafoHTML = function(texto){
    this.texto = texto;
}

const sitioweb = new ConstructorSitios();

//almacenar los datos 
const elementosWeb = [];

elementosWeb.push(sitioweb.crearElemento('Bienvenido', 'h1'));
elementosWeb.push(sitioweb.crearElemento('Bienvenidos a mi nuevo sitio web', 'p'));
elementosWeb.push(sitioweb.crearElemento('Logo.svg', 'img'));
elementosWeb.push(sitioweb.crearElemento('Contactanos', 'input'));

elementosWeb.forEach(elemento => {
    elemento.mostrar();
})