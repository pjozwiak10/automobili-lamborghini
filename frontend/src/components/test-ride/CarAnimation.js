import React from 'react';
import huracan from '../../images/test-ride/huracan.png';
import aventador from '../../images/test-ride/aventador.png';
import gallardo from '../../images/test-ride/gallardo.png';
import murcielago from '../../images/test-ride/murcielago.png';
import urus from '../../images/test-ride/urus.png';


const CarAnimation = () => {
  return (
    <>
      <div className="test-ride__chosen-model-container">
        <p className="test-ride__chosen-model huracan">Huracan</p>
        <p className="test-ride__chosen-model aventador">Aventador</p>
        <p className="test-ride__chosen-model gallardo">Gallardo</p>
        <p className="test-ride__chosen-model murcielago">Murcielago</p>
        <p className="test-ride__chosen-model urus">Urus</p>
      </div>
      <div className="test-ride__chosen-image-container">
        <img src={huracan} alt="huracan" className="test-ride__chosen-image huracan" />
        <img src={aventador} alt="aventador" className="test-ride__chosen-image aventador" />
        <img src={gallardo} alt="gallardo" className="test-ride__chosen-image gallardo" />
        <img src={murcielago} alt="murcielago" className="test-ride__chosen-image murcielago" />
        <img src={urus} alt="urus" className="test-ride__chosen-image urus" />
      </div>
    </>
  );
}

export default CarAnimation;