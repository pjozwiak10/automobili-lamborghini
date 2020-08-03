import React from 'react';
import palette from '../../images/customisations/pantone.svg';
import rim from '../../images/customisations/rim.svg';
import roof from '../../images/customisations/roof.svg';
import settings from '../../images/customisations/settings.svg';

const Parameters = ({ selectedModel, parameterState, handleModel3D, hideParametersValue, handleParametersValue, handleOptionsCar }) => {
  return (
    <div className="customisations__parameters">
      <div className="customisations__selected-parameter">
        <div className="customisations__selected-parameter-close" onClick={hideParametersValue}>X</div>
        <p className="customisations__selected-parameter-title">{parameterState.parameter}</p>
        <div className="customisations__selected-parameter-content">
          {(() => {
            switch (parameterState.group) {
              case "colors":
                return parameterState.values.map(el => (
                  <div className="customisations__selected-parameter-value-container" key={el.id}>
                    <div className="customisations__selected-parameter-value" style={{ background: `linear-gradient(${el.gradient})` }} data-id={el.id} onClick={() => handleModel3D(el.id)}></div>
                    <p className="customisations__selected-parameter-value-name">{el.name}</p>
                  </div>
                ));
              case "options":
                return parameterState.values.map(el => (
                  <div className="customisations__selected-parameter-value-container" data-id={el.id} key={el.id}>
                    <div className="customisations__selected-parameter-value-confirm">
                      <span className="fas fa-check"></span>
                    </div>
                    <img src={el.img} alt={el.name} className="customisations__selected-parameter-value-image" onClick={(e) => handleOptionsCar(e, el.id)} />
                    <p className="customisations__selected-parameter-value-name options">{el.name}</p>
                  </div>
                ));
              default:
                return parameterState;
            }
          })()}
        </div>
      </div>
      <div className="customisations__selected-model">{selectedModel}</div>
      <div className="customisations__parameter" data-parameter="paint" onClick={handleParametersValue}>
        <img src={palette} alt="palette" className="customisations__parameter-icon" />
        <div className="customisations__hover-background paint"></div>
        <p className="customisations__hover-text paint">paint</p>
      </div>
      <div className="customisations__parameter" data-parameter="rims" onClick={handleParametersValue}>
        <img src={rim} alt="rim" className="customisations__parameter-icon" />
        <div className="customisations__hover-background rims"></div>
        <p className="customisations__hover-text rims">rims</p>
      </div>
      <div className="customisations__parameter" data-parameter="top view" onClick={handleParametersValue}>
        <img src={roof} alt="rim" className="customisations__parameter-icon" />
        <div className="customisations__hover-background top-view"></div>
        <p className="customisations__hover-text top-view">Top View</p>
      </div>
      <div className="customisations__parameter" data-parameter="details" onClick={handleParametersValue}>
        <img src={settings} alt="settings" className="customisations__parameter-icon" />
        <div className="customisations__hover-background details"></div>
        <p className="customisations__hover-text details">Details</p>
      </div>
    </div>
  );
}

export default Parameters;