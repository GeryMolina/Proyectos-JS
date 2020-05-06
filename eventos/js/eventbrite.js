class Eventbrite {
    constructor(){
        this.token_auth = 'TUKTH6ULM6QZUDCARJRO';
        this.ordenar = 'date';
    }
    //Mostar resultado de la busqueda 
    async obtenerEventos(evento, categoria) {
        const respuestaEvento = await fetch (`https://www.eventbriteapi.com/v3/events/search/?q=${evento}&sort_by=${this.ordenar}&categories=${categoria}&token=${this.token_auth}`)
        //esperar la respuesta del evento y devolverlo a json 
        const eventos = await respuestaEvento.json();
        
        return{
            eventos
        }
    }
    //Obtiene las categorías en init()
    async obtenerCategorias() {
        //Consultar categorias a la Rest Api de eventbrite
        const respuestaCategorias = await fetch (`https://www.eventbriteapi.com/v3/categories/?token=${this.token_auth}`);
        //Obtener respuesta de categorías y devolver Json
        const categorias = await respuestaCategorias.json();

        return {
            categorias
        }
    }
    
}