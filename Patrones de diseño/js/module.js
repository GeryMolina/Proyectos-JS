//IIFE (funciones que se declaran y se ejecutan a la vez)
const comprarBoleto = (function () {

    //Privado
    let evento = 'Conferencia';
    // let precio = 200;
    const adquirirBoleto = () => {
        const elemento = document.createElement('p');
        elemento.textContent = `Comprando boleto para ${evento}`;
        document.querySelector('#app').appendChild(elemento);

    }

    //Publico
    return {
        mostrarBoleto: function(){
            adquirirBoleto();   
        }
    }

})();

comprarBoleto.mostrarBoleto(); //podemos acceder pq se encuentra de forma publica
// console.log(precio)// nos arroja error ya que solo existe en el scope de la función