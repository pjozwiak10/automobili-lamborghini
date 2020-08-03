import React from 'react'

const SelectList = ({ handleVersions, handleRippleEffect }) => {
  return (
    <div className="specifications__select">
      <ul className="specifications__select-list">
        <li className="specifications__select-list-item huracan" data-id="huracan" onClick={handleVersions} onMouseDown={handleRippleEffect}>
          <h2 className="specifications__select-car">Huracan</h2>
          <p className="specifications__select-quote">"When You Stop Working, You Start To Die." - Ferruccio Lamborghini</p>
        </li>
        <li className="specifications__select-list-item aventador" data-id="aventador" onClick={handleVersions} onMouseDown={handleRippleEffect}>
          <h2 className="specifications__select-car">Aventador</h2>
          <p className="specifications__select-quote">"It Wasn't Worth It." - No Lamborghini Owner, Ever</p>
        </li>
        <li className="specifications__select-list-item gallardo" data-id="gallardo" onClick={handleVersions} onMouseDown={handleRippleEffect}>
          <h2 className="specifications__select-car">Gallardo</h2>
          <p className="specifications__select-quote">"You Buy a Ferrari When You Want To Be Somebody. You Buy a Lamborghini When You Are Somebody." - Frank Sinatra</p>
        </li>
        <li className="specifications__select-list-item murcielago" data-id="murcielago" onClick={handleVersions} onMouseDown={handleRippleEffect}>
          <h2 className="specifications__select-car">Murcielago</h2>
          <p className="specifications__select-quote">"Mr, I'll Do It Later, Never Owned A Lamborghini." - Prime Way Of Life</p>
        </li>
        <li className="specifications__select-list-item urus" data-id="urus" onClick={handleVersions} onMouseDown={handleRippleEffect}>
          <h2 className="specifications__select-car">Urus</h2>
          <p className="specifications__select-quote">"Lamborghini is refinement, luxury and perfection." - Ferruccio Lamborghini</p>
        </li>
      </ul>
    </div>
  );
}

export default SelectList;