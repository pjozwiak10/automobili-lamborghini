import React from 'react'

const FormCar = ({ handleInputChange, checkbox, submitMessage }) => {
  return (
    <div className="test-ride__form test-ride__form--car">
      <h2 className="test-ride__form-header">Choose Your Car</h2>
      <ul className="test-ride__list">
        <h3 className="test-ride__list-header">Model</h3>
        <li className="test-ride__list-item">
          <label htmlFor="" className="test-ride__list-element">
            <input type="checkbox" className="test-ride__input-checkbox browser-default" data-group="model" name="huracan" checked={checkbox[0].checked} onChange={handleInputChange} />
            <p className="test-ride__list-text">Huracan</p>
          </label>
        </li>
        <li className="test-ride__list-item">
          <label htmlFor="" className="test-ride__list-element">
            <input type="checkbox" className="test-ride__input-checkbox browser-default" data-group="model" name="aventador" checked={checkbox[1].checked} onChange={handleInputChange} />
            <p className="test-ride__list-text">Aventador</p>
          </label>
        </li>
        <li className="test-ride__list-item">
          <label htmlFor="" className="test-ride__list-element">
            <input type="checkbox" className="test-ride__input-checkbox browser-default" data-group="model" name="gallardo" checked={checkbox[2].checked} onChange={handleInputChange} />
            <p className="test-ride__list-text">Gallardo</p>
          </label>
        </li>
        <li className="test-ride__list-item">
          <label htmlFor="" className="test-ride__list-element">
            <input type="checkbox" className="test-ride__input-checkbox browser-default" data-group="model" name="murcielago" checked={checkbox[3].checked} onChange={handleInputChange} />
            <p className="test-ride__list-text">Murcielago</p>
          </label>
        </li>
        <li className="test-ride__list-item">
          <label htmlFor="" className="test-ride__list-element">
            <input type="checkbox" className="test-ride__input-checkbox browser-default" data-group="model" name="urus" checked={checkbox[4].checked} onChange={handleInputChange} />
            <p className="test-ride__list-text">Urus</p>
          </label>
        </li>
        <h3 className="test-ride__list-header">Body</h3>
        <li className="test-ride__list-item body">
          <label htmlFor="" className="test-ride__list-element">
            <input type="checkbox" className="test-ride__input-checkbox browser-default" data-group="body" name="coupe" checked={checkbox[5].checked} onChange={handleInputChange} />
            <p className="test-ride__list-text body">Coupe</p>
          </label>
        </li>
        <li className="test-ride__list-item body">
          <label htmlFor="" className="test-ride__list-element">
            <input type="checkbox" className="test-ride__input-checkbox browser-default" data-group="body" name="roadster" checked={checkbox[6].checked} onChange={handleInputChange} />
            <p className="test-ride__list-text body">Roadster</p>
          </label>
        </li>
      </ul>
      <input type="submit" value="Confirm" className="test-ride__submit" />
      {submitMessage.msg && <span className="test-ride__message">{submitMessage.msg}</span>}
    </div>
  );
}

export default FormCar;