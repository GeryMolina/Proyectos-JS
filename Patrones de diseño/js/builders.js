//Se trata de crear una abstracción que nos permita crear distintos tipos de objetos
//En este patrón es necesario agregar el tipo y el contenido del objeto que deseamos crear

class Formulario {
    constructor() {
        this.campos = []
    }
    //creamos metodo
    agregarCampo(tipo, texto) {
        let campos = this.campos;

        let campo;
        //se crean distintas instancias
        switch (tipo) {
            case 'text':
                campo = new InputText(texto);
                break;
            case 'email':
                campo = new InputEmail(texto);
                break;
            case 'button':
                campo = new Boton(texto);
                break;
            default:
                throw new Error('Tipo no valido' + tipo);
        }

        campos.push(campo)
    }

    obtenerFormulario() {
        let form = document.createElement('form')
        let campos = this.campos.length;
        let campo;

        for(let i = 0; i < campos; i++){
            campo = this.campos[i];
            form.appendChild(campo.crearElemento());
            let br = document.createElement('br');
            form.appendChild(br)
        }
        return form;
    }

}

class Inputs {
    constructor(texto) {
        this.texto = texto;
    }
}
class InputText extends Inputs {
    constructor(texto) {
        super(texto);
    }
    crearElemento() {
        const inputText = document.createElement('input');
        inputText.setAttribute('type', 'text');
        inputText.setAttribute('placeholder', this.texto);
        return inputText;
    }
}

class InputEmail extends Inputs {
    constructor(texto) {
        super(texto);
    }
    crearElemento() {
        const inputEmail = document.createElement('input');
        inputEmail.setAttribute('type', 'email');
        inputEmail.setAttribute('placeholder', this.texto);
        return inputEmail;
    }
}

class Boton extends Inputs {
    constructor(texto) {
        super(texto);
    }
    crearElemento() {
        const button = document.createElement('input');
        button.setAttribute('type', 'submit');
        button.textContent = this.texto;
        return button;
    }
}
//Instanciar formulario 

const formulario = new Formulario();
formulario.agregarCampo('text', 'añade tu nombre');
formulario.agregarCampo('text', 'añade tu Apellido');
formulario.agregarCampo('email', 'añade tu correo');
formulario.agregarCampo('button', 'Enviar');

//Renderizar en el HTML

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#app').appendChild(formulario.obtenerFormulario())
})
console.log(formulario)