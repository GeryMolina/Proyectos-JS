//JS EVENT LOOP

console.log('Soy el primero');

setTimeout( () => {
    console.log('Soy el segundo');
},0);
//SetTimeout se lo conoce como non Blocking, eso significa que no se coloca en el Stack se va al Queue(TASK QUEUE)
console.log('Soy el tercero');

setTimeout( () => {
    console.log('Soy el cuarto');
},0);
//Los promise perteneces a Queue pero a los Jobs Queue, que tiene mayor prioridad que task Queue
new Promise ((res) => {
    res('Soy un Promise')
}).then(console.log);

console.log('Soy el quinto');