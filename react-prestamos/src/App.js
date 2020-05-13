import React, { Fragment, useState } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Mensaje from './components/Mensaje';
import Spinner from './components/Spinner';

function App() {
  const [cantidad, setCantidad] = useState(0);
  const [plazo, setPlazo] = useState('');
  const [total, setTotal] = useState(0);
  const [cargar, setCargar] = useState(false)

  //Carga condicional en react para cargar un u otro elemento segun se cumpla la condicion
  let componente;
  if (cargar) {
    componente = <Spinner />
  } else if (total === 0) {
    componente = <Mensaje />
  } else {
    componente =
      <Resultado
        total={total}
        plazo={plazo}
        cantidad={cantidad}
      />
  }

  return (
    <Fragment>
      <Header
        titulo='Cotizador de prestamos' />
      <div className='container'>
        <Formulario
          cantidad={cantidad}
          setCantidad={setCantidad}
          plazo={plazo}
          setPlazo={setPlazo}
          setTotal={setTotal}
          setCargar={setCargar}
        />
        <div className='mensajes'>
          {componente}
        </div>

      </div>


    </Fragment>
  );
}

export default App;
