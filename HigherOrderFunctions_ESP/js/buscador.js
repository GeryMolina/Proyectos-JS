// crear los años
const years = document.createElement('option');
const  max = new Date().getFullYear();
let  min = max - 10;

for(let i = max; i >  min; i--) {
    let option =  document.createElement('option');
    option.value = i;
    option.innerText = i;
    document.querySelector('#year').appendChild(option);
}

const obtenerAutos = () =>{
    return  [
        {
            marca: 'BMW',
            modelo: 'Serie 3',
            year: 2012,
            precio: 30000,
            puertas: 4,
            color: 'Blanco',
            transmision: 'automatico'
        },
        { marca: 'Audi', modelo: 'A4', year: 2018, precio: 40000, puertas: 4, color: 'Negro', transmision: 'automatico' },
        {
            marca: 'Ford',
            modelo: 'Mustang',
            year: 2015,
            precio: 20000,
            puertas: 2,
            color: 'Blanco',
            transmision: 'automatico'
        },
        { marca: 'Audi', modelo: 'A6', year: 2010, precio: 35000, puertas: 4, color: 'Negro', transmision: 'automatico' },
        {
            marca: 'BMW',
            modelo: 'Serie 5',
            year: 2016,
            precio: 70000,
            puertas: 4,
            color: 'Rojo',
            transmision: 'automatico'
        },
        {
            marca: 'Mercedes Benz',
            modelo: 'Clase C',
            year: 2015,
            precio: 25000,
            puertas: 4,
            color: 'Blanco',
            transmision: 'automatico'
        },
        {
            marca: 'Chevrolet',
            modelo: 'Camaro',
            year: 2018,
            precio: 60000,
            puertas: 2,
            color: 'Rojo',
            transmision: 'manual'
        },
        { marca: 'Ford', modelo: 'Mustang', year: 2019, precio: 80000, puertas: 2, color: 'Rojo', transmision: 'manual' },
        {
            marca: 'Dodge',
            modelo: 'Challenger',
            year: 2017,
            precio: 40000,
            puertas: 4,
            color: 'Blanco',
            transmision: 'automatico'
        },
        { marca: 'Audi', modelo: 'A3', year: 2017, precio: 55000, puertas: 2, color: 'Negro', transmision: 'manual' },
        {
            marca: 'Dodge',
            modelo: 'Challenger',
            year: 2012,
            precio: 25000,
            puertas: 2,
            color: 'Rojo',
            transmision: 'manual'
        },
        {
            marca: 'Mercedes Benz',
            modelo: 'Clase C',
            year: 2018,
            precio: 45000,
            puertas: 4,
            color: 'Azul',
            transmision: 'automatico'
        },
        {
            marca: 'BMW',
            modelo: 'Serie 5',
            year: 2019,
            precio: 90000,
            puertas: 4,
            color: 'Blanco',
            transmision: 'automatico'
        },
        { marca: 'Ford', modelo: 'Mustang', year: 2017, precio: 60000, puertas: 2, color: 'Negro', transmision: 'manual' },
        {
            marca: 'Dodge',
            modelo: 'Challenger',
            year: 2015,
            precio: 35000,
            puertas: 2,
            color: 'Azul',
            transmision: 'automatico'
        },
        {
            marca: 'BMW',
            modelo: 'Serie 3',
            year: 2018,
            precio: 50000,
            puertas: 4,
            color: 'Blanco',
            transmision: 'automatico'
        },
        {
            marca: 'BMW',
            modelo: 'Serie 5',
            year: 2017,
            precio: 80000,
            puertas: 4,
            color: 'Negro',
            transmision: 'automatico'
        },
        {
            marca: 'Mercedes Benz',
            modelo: 'Clase C',
            year: 2018,
            precio: 40000,
            puertas: 4,
            color: 'Blanco',
            transmision: 'automatico'
        },
        { marca: 'Audi', modelo: 'A4', year: 2016, precio: 30000, puertas: 4, color: 'Azul', transmision: 'automatico' }
    ];
    
}

//datos para la busqueda

let datosBusqueda =  {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''   
}

// Event Listener DOM Loaded
const autos = obtenerAutos()

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos)
});

//Event listener para formulario 
const marca = document.querySelector('#marca');
marca.addEventListener('input', e => {
    //mando los datos al objeto
    datosBusqueda.marca = e.target.value;
    //Mandar a llamar la funcion filtrar autos 
    filtrarAuto()
});
const year = document.querySelector('#year');
year.addEventListener('input', e => {
    //mando los datos al objeto
    datosBusqueda.year = Number(e.target.value);
    //Mandar a llamar la funcion filtrar autos 
    filtrarAuto()
});
const minimo = document.querySelector('#minimo');
minimo.addEventListener('input', e => {
    //mando los datos al objeto
    datosBusqueda.minimo = Number(e.target.value);
    //Mandar a llamar la funcion filtrar autos 
    filtrarAuto()
});
const maximo = document.querySelector('#maximo');
maximo.addEventListener('input', e => {
    //mando los datos al objeto
    datosBusqueda.maximo = Number(e.target.value);
    //Mandar a llamar la funcion filtrar autos 
    filtrarAuto()
})
const puertas = document.querySelector('#puertas');
puertas.addEventListener('input', e => {
    //mando los datos al objeto
    datosBusqueda.puertas = Number(e.target.value);
    //Mandar a llamar la funcion filtrar autos 
    filtrarAuto()
})
const transmision = document.querySelector('#transmision');
transmision.addEventListener('input', e => {
    //mando los datos al objeto
    datosBusqueda.transmision = e.target.value;
    //Mandar a llamar la funcion filtrar autos 
    filtrarAuto()
});
const color = document.querySelector('#color');
color.addEventListener('input', e => {
    //mando los datos al objeto
    datosBusqueda.color = e.target.value;
    //Mandar a llamar la funcion filtrar autos 
    filtrarAuto()
});
const limpiarHtml = () => {
    //Limpiar los resultados anteriores
    const contenedor = document.querySelector('#resultado');
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild)
    }
}

const mostrarAutos = (autos) => {
    limpiarHtml();
    //Leer elemento Resultado
    const contenedor = document.querySelector('#resultado');
    //Construir HTML
    autos.forEach(auto => {
        const autoHTML = document.createElement('p');
        autoHTML.innerHTML = `
            <p>${auto.marca} ${auto.modelo} - ${auto.year} - ${auto.puertas} Puertas - Transmisión: ${auto.transmision}
            - Precio: ${auto.precio} - Color: ${auto.color}</p>
        `;
        contenedor.appendChild(autoHTML);
    })
}
const sinResultado = () => {
    limpiarHtml();
    const sinResultado = document.createElement('div');
    sinResultado.classList.add('alerta', 'error');
    sinResultado.appendChild(document.createTextNode('No hay resultado'));
    document.querySelector('#resultado').appendChild(sinResultado)
}

const filtrarAuto = () =>{
    const resultado = obtenerAutos().filter(filtarMarca).filter(filtrarYear).filter(filtrarMinimo)
    .filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    if(resultado.length) {
        mostrarAutos(resultado);
    } else {
        sinResultado()
    }
}

const filtarMarca = (auto) => {
    if(datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    } else {
        return auto;
    }
}
const filtrarYear = (auto) => {
    if(datosBusqueda.year) {
        return auto.year === datosBusqueda.year;
    } else {
        return auto;
    }
}
const filtrarMinimo = (auto) => {
    if(datosBusqueda.minimo) {
        return auto.precio >= datosBusqueda.minimo;
    } else {
        return auto
    }
}
const filtrarMaximo = (auto) => {
    if(datosBusqueda.maximo) {
        return auto.precio <= datosBusqueda.maximo;
    } else {
        return auto
    }
}
const filtrarPuertas = (auto) => {
    if(datosBusqueda.puertas) {
        return auto.puertas === datosBusqueda.puertas;
    } else {
        return auto
    }
}
const filtrarTransmision = (auto) => {
    if(datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    } else {
        return auto
    }
}
const filtrarColor = (auto) => {
    if(datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    } else {
        return auto
    }
}