class UI {
    constructor() {
        //Instanciar api
        this.api = new API();
        //crear los markets con layerGroup
        this.markers = new L.LayerGroup();
        // Iniciar el mapa
        this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
        // Inicializar y obtener la propiedad del mapa
        const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + enlaceMapa + ' Contributors',
            maxZoom: 18,
        }).addTo(map);

        return map;

    }
    mostrasEstablecimientos() {
        this.api.obtenerDatos()
        .then( data => {
            const resultados = data.respuestaJson.results;
            //ejecutar la funcion mostrar pines
            this.mostrarPines(resultados);
        })
    }
    mostrarPines(datos) {
        //limpiar los markets
        this.markers.clearLayers();
        //recorrer los establecimientos
        datos.forEach( dato => {
            //destructuring
            const {latitude, longitude, calle, regular, premium} = dato;

            //Crear popup
            const opcionesPopUp = L.popup()
                    .setContent(
                        `<p>Calle: ${calle}</p>
                         <p><b>Regular:</b> ${regular}</p>
                         <p><b>Premium:</b> ${premium}</p>  
                        `
                    )

            //agregar el pin
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopUp);

            this.markers.addLayer(marker);
        })
        this.markers.addTo(this.mapa);
    }
    obtenerSugerencias(busqueda) {
        this.api.obtenerDatos()
            .then( data => {
                //obtener los datos 
                const resultados = data.respuestaJson.results;

                //Enviar el json y busqueda para el filtrado 
                this.filtarSugerencias(resultados, busqueda)
            })
    }
    filtarSugerencias(resultado, busqueda) {
        //filtrar con .filter
        const filtro = resultado.filter( filtro => filtro.calle.indexOf(busqueda) !== -1);

        //montrar los pines
        mostrarPines(filtro)
    }
}