import React, { useEffect, useRef } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';
import monaco from '../../images/countries/monaco.jpg';
import italy from '../../images/countries/italy.jpg';
import france from '../../images/countries/france.jpg';
import spain from '../../images/countries/spain.jpg';
import germany from '../../images/countries/germany.jpg';
import monacoFlag from '../../images/countries/monaco-flag.svg';
import italyFlag from '../../images/countries/italy-flag.svg';
import franceFlag from '../../images/countries/france-flag.svg';
import spainFlag from '../../images/countries/spain-flag.svg';
import germanyFlag from '../../images/countries/germany-flag.svg';

const Menu = ({ menu, toggleMenu, history, dimensions }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' });

  const isAboveWrapper = useMediaQuery({ query: '(min-width: 1440px)' });
  const clientWidth = document.body.clientWidth;

  let menuBg = useRef(null);
  let menuBgAdditional = useRef(null);

  const countries = [
    { name: 'monaco', img: monaco },
    { name: 'italy', img: italy },
    { name: 'france', img: france },
    { name: 'spain', img: spain },
    { name: 'germany', img: germany },
  ]

  useEffect(() => {
    if (menu) {
      gsap.to([menuBgAdditional, menuBg], {
        duration: 0,
        height: isDesktopOrLaptop ? dimensions.height : dimensions.height - 60,
      })
    }
  }, [menu, dimensions, isDesktopOrLaptop])

  useEffect(() => {
    history.listen(() => {
      toggleMenu(false)
    }, [history])

    const menuTl = gsap.timeline();

    if (menu && isDesktopOrLaptop) {
      menuTl.from([menuBgAdditional, menuBg], {
        duration: 0.8,
        transformOrigin: 'left top',
        height: 0,
        skewY: -10,
        stagger: 0.1,
        ease: 'power3.inOut'
      })
        .from('.menu__list-link', {
          duration: 0.5,
          y: '100%',
          stagger: 0.2,
          opacity: 0,
          pointerEvents: 'none',
        }, '-=0.2')
        .from('.menu__country-description', {
          duration: 0.4,
          x: -40,
          opacity: 0,
        }, '-=0.2')
        .from('.menu__country-list-item', {
          duration: 0.2,
          y: 40,
          stagger: 0.2,
        }, '-=1')
    } else if (menu && !isDesktopOrLaptop) {
      menuTl.from([menuBgAdditional, menuBg], {
        duration: 0.8,
        transformOrigin: 'left top',
        height: 0,
        skewY: -10,
        stagger: 0.1,
        ease: 'power3.inOut'
      })
        .from('.menu__list-link', {
          duration: 0.5,
          y: '100%',
          stagger: 0.2,
          opacity: 0,
          pointerEvents: 'none',
        }, '-=0.2')
        .from('.menu__country-description', {
          duration: 0.4,
          x: -200,
        }, '-=1')
        .from('.menu__country-list-item', {
          duration: 0.2,
          x: -100,
          stagger: 0.2,
        }, '-=0.6')
        .from(['.navigation__content-slogan', '.navigation__social-media'], {
          duration: 0.4,
          x: 100,
          stagger: 0.2,
        }, '-=1')
    } else if (!menu) {
      menuTl.to([menuBg, menuBgAdditional], {
        duration: 0.8,
        height: 0,
        ease: 'power3.inOut',
        stagger: 0.1,
      })
    }

  }, [menu, history, toggleMenu, isDesktopOrLaptop])

  const handleHover = (e) => {
    gsap.to(e.target, {
      duration: 0.4,
      y: 3,
      skewX: 4,
      ease: 'power3.inOut',
      color: '#BE0921',
    })
  }

  const handleHoverOut = (e) => {
    gsap.to(e.target, {
      duration: 0.4,
      y: -3,
      skewX: 0,
      ease: 'power3.inOut',
      color: '#000',
    })
  }

  const showCountry = (e) => {
    const id = e.target.dataset.id;
    const country = countries.filter(country => country.name === id)[0].img;
    if (!isDesktopOrLaptop) {
      const elementsToHidden = [...e.target.parentNode.children].filter(el => el.dataset.id !== id);
      gsap.to(elementsToHidden, {
        duration: 0.5,
        opacity: 0,
      })
      gsap.to(['.navigation__content-slogan', '.navigation__social-media', '.menu__country-description'], {
        duration: 0.5,
        opacity: 0,
      })
    }
    gsap.to('.menu__country-background', {
      duration: 0,
      backgroundImage: `url(${country})`
    })
    gsap.to('.menu__country-background', {
      duration: 0.5,
      opacity: 1,
      ease: 'power3.inOut',
    })
    gsap.from('.menu__country-background', {
      duration: 0.5,
      skewY: 4,
      transformOrigin: 'right top',
    })
    gsap.to('.menu__list-link', {
      duration: 0,
      delay: 0.2,
      mixBlendMode: 'difference',
      color: '#fff',
    })
  }

  const hideCountry = (e) => {
    if (!isDesktopOrLaptop) {
      const elementsToVisible = [...e.target.parentNode.children]
      gsap.to(elementsToVisible, {
        duration: 0.5,
        opacity: 1,
      })
      gsap.to(['.navigation__content-slogan', '.navigation__social-media', '.menu__country-description'], {
        duration: 0.5,
        opacity: 1,
      })
    }
    gsap.to('.menu__country-background', {
      duration: 0.5,
      opacity: 0,
      skewY: 0,
    })
    gsap.to('.menu__list-link', {
      duration: 0,
      delay: 0.2,
      mixBlendMode: 'normal',
      color: '#000',
    })
  }

  return (
    <>
      <div className="menu__additional-background" ref={el => menuBgAdditional = el}
        style={{
          width: isAboveWrapper ? clientWidth - 200 - (clientWidth - 1440) + 'px' : null,
          right: isAboveWrapper ? ((clientWidth - 1440) / 2) + 'px' : null
        }}>
      </div>
      <div className="menu" ref={el => menuBg = el}
        style={{
          width: isAboveWrapper ? clientWidth - 200 - (clientWidth - 1440) + 'px' : null,
          right: isAboveWrapper ? ((clientWidth - 1440) / 2) + 'px' : null
        }}>
        <div className="menu__country-background"></div>
        <div className="menu__list-container">
          <ul className="menu__list">
            <li className="menu__list-item"><NavLink to="/" className="menu__list-link" onMouseEnter={handleHover} onMouseOut={handleHoverOut}>homepage</NavLink></li>
            <li className="menu__list-item"><NavLink to="/customisations" className="menu__list-link" onMouseEnter={handleHover} onMouseOut={handleHoverOut}>customisations</NavLink></li>
            <li className="menu__list-item"><NavLink to="/specifications" className="menu__list-link" onMouseEnter={handleHover} onMouseOut={handleHoverOut}>specifications</NavLink></li>
          </ul>
        </div>
        <div className="menu__country">
          <p className="menu__country-description">Country :</p>
          <ul className="menu__country-list">
            <li className="menu__country-list-item" data-id="monaco"
              onMouseEnter={isDesktopOrLaptop ? showCountry : undefined} onMouseOut={isDesktopOrLaptop ? hideCountry : undefined}
              onTouchStart={!isDesktopOrLaptop ? showCountry : undefined} onTouchEnd={!isDesktopOrLaptop ? hideCountry : undefined}
            >{isDesktopOrLaptop ? 'Monaco' : <img className="menu__country-flag" src={monacoFlag} alt="Monaco flag" />}</li>
            <li className="menu__country-list-item" data-id="italy"
              onMouseEnter={isDesktopOrLaptop ? showCountry : undefined} onMouseOut={isDesktopOrLaptop ? hideCountry : undefined}
              onTouchStart={!isDesktopOrLaptop ? showCountry : undefined} onTouchEnd={!isDesktopOrLaptop ? hideCountry : undefined}
            >{isDesktopOrLaptop ? 'Italy' : <img className="menu__country-flag" src={italyFlag} alt="Italy flag" />}</li>
            <li className="menu__country-list-item" data-id="spain"
              onMouseEnter={isDesktopOrLaptop ? showCountry : undefined} onMouseOut={isDesktopOrLaptop ? hideCountry : undefined}
              onTouchStart={!isDesktopOrLaptop ? showCountry : undefined} onTouchEnd={!isDesktopOrLaptop ? hideCountry : undefined}
            >{isDesktopOrLaptop ? 'Spain' : <img className="menu__country-flag" src={spainFlag} alt="Spain flag" />}</li>
            <li className="menu__country-list-item" data-id="france"
              onMouseEnter={isDesktopOrLaptop ? showCountry : undefined} onMouseOut={isDesktopOrLaptop ? hideCountry : undefined}
              onTouchStart={!isDesktopOrLaptop ? showCountry : undefined} onTouchEnd={!isDesktopOrLaptop ? hideCountry : undefined}
            >{isDesktopOrLaptop ? 'France' : <img className="menu__country-flag" src={franceFlag} alt="France flag" />}</li>
            <li className="menu__country-list-item" data-id="germany"
              onMouseEnter={isDesktopOrLaptop ? showCountry : undefined} onMouseOut={isDesktopOrLaptop ? hideCountry : undefined}
              onTouchStart={!isDesktopOrLaptop ? showCountry : undefined} onTouchEnd={!isDesktopOrLaptop ? hideCountry : undefined}
            >{isDesktopOrLaptop ? 'Germany' : <img className="menu__country-flag" src={germanyFlag} alt="Germany flag" />}</li>
          </ul>
        </div>
        {!isDesktopOrLaptop && <p className="navigation__content-slogan">BeVisionary</p>}
        {!isDesktopOrLaptop && <div className="navigation__social-media">
          <a href="https://www.facebook.com/" className="navigation__social-link facebook">fb</a>
          <a href="https://www.instagram.com/?hl=pl" className="navigation__social-link instagram">insta</a>
          <a href="https://twitter.com/explore" className="navigation__social-link twitter">tw</a>
          <a href="/" className="navigation__social-link share">share</a>
        </div>}
      </div>
    </>
  );
}

export default withRouter(Menu);
