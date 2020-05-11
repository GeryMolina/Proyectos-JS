//COMPOSICION
//Se declaran metodos que pueden ser llamados dentro de los objetos 
const obtenerNombre = (info) => ({
    mostrarNombre() {
        console.log(`Nombre: ${info.nombre}`)
    }
})

const guardarEmail = (info) => ({
    email(email) {
        console.log(`Guardando el email en ${info.nombre}`);
        info.email = email;
    }
})

const obtenerEmail = (info) => ({
    mostrarEmail() {
        console.log(`Email: ${info.email}`)
    }
})

const obtenerEmpresa = (info) => ({
    mostrarEmpresa() {
        console.log(`Empresa: ${info.empresa}`)
    }
})

const obtenerPuesto = (info) => ({
    mostrarPuestol() {
        console.log(`Puesto: ${info.puesto}`)
    }
})

//Objetos o Clases
function Cliente(nombre, email, empresa) {
    let info ={
        nombre,
        email, 
        empresa
    }
    return Object.assign( 
        info,
        obtenerNombre(info),
        guardarEmail(info),
        obtenerEmail(info),
        obtenerEmpresa(info)
    )
}
function Empleado(nombre, email, puesto) {
    let info ={
        nombre,
        email, 
        puesto
    }
    return Object.assign( 
        info,
        obtenerNombre(info),
        guardarEmail(info),
        obtenerEmail(info),
        obtenerPuesto(info)
    )
}

const cliente = Cliente('Juan', null, 'Udemy');
cliente.mostrarNombre();
cliente.email('juan@gmail.com');
cliente.mostrarEmail();
cliente.mostrarEmpresa()

const empleado = Empleado('Luis', null, 'Programador');
empleado.mostrarNombre()
empleado.email('empleado@gmail.com');
empleado.mostrarEmail();
empleado.mostrarPuestol();