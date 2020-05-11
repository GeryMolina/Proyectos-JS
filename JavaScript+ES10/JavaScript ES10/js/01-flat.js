const edades = [8,10,9, 11, [13,18, 20, [18,20,21]]];
//contamos con un arreglo que dentro tiene mas arreglos, para poder acceder a ellos de forma directa con Flat
console.log(edades.flat(Infinity))//dentro del parentesis indicamos los niveles a aplanar, la palabra infinity nos aplana todos 