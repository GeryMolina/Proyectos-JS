const productos = [
    { nombre: 'Producto 1', precio: 20},
    { nombre: 'Producto 2', precio: 30},
    { nombre: 'Producto 3', precio: 40}
];
//Cumple la misma funcion del flat, pero recorre el arrglo igual que el map y devuelve un nuevo array

//Utiluzando el map y el flat por separado
// const resultado = productos.map( producto => [producto.nombre, producto.precio]);
// console.log(resultado.flat(1));

//utilizando Flatmap()

const resultado = productos.flatMap( producto => [producto.nombre, producto.precio]);
console.log(resultado);