// Variables
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const enviaEmail = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');

//Listener
eventListeners()

function eventListeners() {
    //Inicio de la app y desabilitar submit
    document.addEventListener('DOMContentLoaded', inicioAPP);
   
    //Campos del formulario 
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);
   
    //Btn envia formulario 
    enviaEmail.addEventListener('submit', enviarEmail);
    
    //Btn Reset
    resetBtn.addEventListener('click', resetFormulario);
}


//Funciones

function inicioAPP() {
    //deshabilitar en elvio 
    btnEnviar.disabled = true;
}

//Valida que campo tenga algo escrito

function validarCampo() {
    //se valida la longitud del texto y que no esté vacio
    validarLongitud(this);
    //validar unicamente email
    if (this.type === 'email') {
        validarEmail(this);
    }

    let errores = document.querySelectorAll('.error');

    if (email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
        if (errores.length === 0) {
            btnEnviar.disabled = false;
        }
    }
}

//Reset formulario 
function resetFormulario(e) {
    enviaEmail.reset();
    e.preventDefault();
}
//Cuando se envia al correo
function enviarEmail(e) {

    //Spinner al presionar enviar
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';
    //Git qu envia email
    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';
    //ocultar spinner y mostrar gif de enviados
    setTimeout(function () {
        spinnerGif.style.display = 'none';
        document.querySelector('#loaders').appendChild(enviado);

        setTimeout(function () {
            enviado.remove();
            enviaEmail.reset();
        }, 5000)
    }, 3000)

    e.preventDefault();
}

//Verifica la longitud de los textos en los campos
function validarLongitud(campo) {
    if (campo.value.length > 0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function validarEmail(campo) {
    const email = campo.value;
    if (email.indexOf('@') !== -1) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}
