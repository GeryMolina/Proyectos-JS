//Es una forma que permite evitar las coaliciones con los nombre en el scope global, asignando un nombre unico
//Se crea un objeto global donde se van a gregando funciones o metodos

const restaurapp = {};
restaurapp.platillos = [
    {
        platillo: 'pizza',
        precio: 25
    },
    {
        platillo: 'hamburguesa',
        precio: 20
    },
    {
        platillo: 'completo',
        precio: 15
    }
];

//funciones
restaurapp.funciones = {
    ordenar: id => {
        console.log(`Tu platillo: ${restaurapp.platillos[id].platillo} se está preparando`)
    },
    agregarPlato: (platillo, precio) => {
        const nuevo = {
            platillo, 
            precio
        }
        restaurapp.platillos.push(nuevo);
    },
    mostrarMenu: platos => {
        console.log(`Bienvenido a nuestro menu:  `);
        platos.forEach( (platillo, index) => {
            console.log (`${index}: ${platillo.platillo} $${platillo.precio}`)
        })
    }
}
console.log(restaurapp);

// Destructuring al objeto
const { platillos } = restaurapp;
restaurapp.funciones.mostrarMenu(platillos);
//ordena
restaurapp.funciones.ordenar(2);
//Agregar 
restaurapp.funciones.agregarPlato('pastel', 15);
restaurapp.funciones.mostrarMenu(platillos);