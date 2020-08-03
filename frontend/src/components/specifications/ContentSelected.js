import React from 'react';
import interior from '../../images/specifications/interior.jpg';
import { useMediaQuery } from 'react-responsive';

const ContentSelected = ({ versionsState, hoverEnter, hoverExit, showSpecification, handleRippleEffect }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' });
  return (
    <div className="specifications__content">
      <div className="specifications__image-interior-container">
        <div className="specifications__interior-additional-background">
          <p className="specifications__image-interior-description">select a car to see all</p>
          <p className="specifications__image-interior-description specifications__image-interior-description--strong">features</p>
        </div>
        <img src={interior} alt="lamborghini-interior" className="specifications__image-interior" />
      </div>
      <div className="specifications__content-selected" data-simplebar>
        <ul className="specifications__content-list">
          {versionsState ? versionsState.versions.map(el => (
            <li className="specifications__content-list-item"
              key={el.id}
              data-id={el.id}
              onMouseEnter={isDesktopOrLaptop ? hoverEnter : undefined}
              onMouseLeave={isDesktopOrLaptop ? hoverExit : undefined}
              onClick={() => showSpecification(el.id)}
              onMouseDown={handleRippleEffect}
            >
              <span className="specifications__content-span">{el.version}</span>
            </li>
          )) : null}
        </ul>
      </div>
    </div>
  );
}

export default ContentSelected;