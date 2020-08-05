import React, { memo } from 'react';

const Confirmation = memo(({ handleRippleEffect, configuredModel, handleConfigurationList, configurationConfirmation }) => {

  return (
    <div className="customisations__button-confirmation-container">
      <div className="customisations__confirmation-message">
        <p className="customisations__confirmation-message-text">
          Thank you for configuring the vehicle. We believe that you created a dream car. You will be redirected to the main page.
        </p>
      </div>
      <button className="customisations__button-confirm ripple" onMouseDown={handleRippleEffect} onClick={() => configurationConfirmation(configuredModel)}>Confirm</button>
      <button className="customisations__button-configuration-list ripple" onMouseDown={handleRippleEffect} onClick={handleConfigurationList}><span className="fas fa-car"></span></button>
      {configuredModel && <div className="customisations__configuration-list-container">
        <ul className="customisations__configuration-list">
          <li className="customisations__configuration-list-item"><span>Model:</span> <strong>{configuredModel.model}</strong></li>
          <li className="customisations__configuration-list-item"><span>Paint:</span> <strong>{configuredModel.paint.name}</strong></li>
          <li className="customisations__configuration-list-item"><span>Rims:</span> <strong>{configuredModel.rims.name}</strong></li>
          <li className="customisations__configuration-list-item"><span>Top View:</span> <strong>{configuredModel.topView.name}</strong></li>
          {configuredModel.details.map(el => (
            <li className="customisations__configuration-list-item" key={el.id}><span>{el.name}:</span> <strong>{el.selected ? 'Selected' : 'Unselected'}</strong></li>
          ))}
        </ul>
      </div>}
    </div>
  );
});

export default Confirmation;