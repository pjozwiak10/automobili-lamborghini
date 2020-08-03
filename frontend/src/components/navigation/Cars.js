import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import gsap from 'gsap';
import { connect } from 'react-redux';
import Swiper from 'swiper';
import huracan from '../../images/cars/huracan.jpg';
import aventador from '../../images/cars/aventador.jpg';
import urus from '../../images/cars/urus.jpg';
import gallardo from '../../images/cars/gallardo.jpg';
import murcielago from '../../images/cars/murcielago.jpg';

const Cars = ({ user, cars, configurator, dimensions }) => {
  const initialHeightCard = useRef(null);
  const imageCars = { huracan, aventador, urus, gallardo, murcielago };
  const swiper = useRef(null);
  const hideMessage = useRef(null);
  const [disabled, setDisabled] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1280px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const mediaToChangeAnimation = useMediaQuery({ query: '(min-width: 1024px)' });

  useEffect(() => {
    // eslint-disable-next-line
    swiper.current = new Swiper('.cars__swiper-container', {
      direction: 'vertical',
      slideActiveClass: 'cars-active',
      pagination: {
        el: '.cars__pagination',
        clickable: true,
      },
    });
  }, [])
  useEffect(() => {
    if (user.cars.length > 0) {
      initialHeightCard.current = document.querySelector('.cars__card').getBoundingClientRect().height;
      swiper.current.update();
      swiper.current.setGrabCursor();
    }
  }, [user.cars.length]);
  useEffect(() => {
    gsap.to('.cars__swiper-slide', { duration: 0, height: mediaToChangeAnimation ? dimensions.height : dimensions.height - 60 });
  }, [mediaToChangeAnimation, dimensions.height])
  useEffect(() => {
    const carsTl = gsap.timeline();
    switch (user.cars.length > 0) {
      case true:
        if (cars) {
          carsTl.to('.cars-container', {
            scaleX: 1,
            duration: 1,
            ease: 'power3.inOut',
          }).to('.cars__swiper-slide', {
            duration: 1,
            opacity: 1,
          }).to('.cars__pagination', {
            duration: 0.5,
            right: 15,
          }, '-=0.5')
        } else {
          carsTl.to('.cars__pagination', {
            duration: 0.5,
            right: -15,
          }).to('.cars__swiper-slide', {
            duration: 1,
            opacity: 0,
          }, '-=0.25').to('.cars-container', {
            duration: 1,
            scaleX: 0,
            ease: 'power3.inOut',
          }).to('.cars__card', {
            duration: 0,
            height: initialHeightCard.current,
            onComplete: mediaToChangeAnimation ? () => {
              document.querySelectorAll('.cars__image').forEach(el => {
                el.classList.remove('none')
              });
              document.querySelectorAll('.cars__model-name-hover').forEach(el => {
                el.classList.remove('none');
                el.style.animationPlayState = 'running';
              })
            } : undefined
          })
          if (!mediaToChangeAnimation) {
            gsap.to('.cars__image', { duration: 1, scale: 1, opacity: 0.1, })
            gsap.to('.cars__model-name', { duration: 1, opacity: 0.1, })
          }
        }
        break;
      default:
        if (cars) {
          carsTl.to('.cars-container', {
            scaleX: 1,
            duration: 1,
            ease: 'power3.inOut',
          }).to('.cars__empty', {
            duration: 0.4,
            opacity: 1,
          })
        } else {
          carsTl.to('.cars__empty', {
            duration: 0.4,
            opacity: 0,
          }).to('.cars-container', {
            duration: 1,
            scaleX: 0,
            ease: 'power3.inOut',
          })
        }
    }
  }, [cars, user.cars, mediaToChangeAnimation])

  const handleCard = (e) => {
    if (disabled) return;
    setDisabled(true);
    setTimeout(() => setDisabled(false), 500)
    const activeClass = e.target.dataset.id;
    if (activeClass === 'info') return;
    const cardTl = gsap.timeline();
    const actualHeightCard = document.querySelector(`.cars__card.${activeClass}`).getBoundingClientRect().height;
    switch (actualHeightCard) {
      case initialHeightCard.current:
        if (mediaToChangeAnimation) {
          cardTl.to(`.cars__image.${activeClass}`, {
            duration: 0,
            className: `cars__image ${activeClass} none`,
          })
            .to(`.cars__model-name-hover.${activeClass}`, {
              duration: 0,
              animationPlayState: 'paused',
              className: `cars__model-name-hover ${activeClass} none`,
            })
            .to(`.cars__card.${activeClass}`, {
              duration: 1,
              height: `${initialHeightCard.current * 2 - 20}px`,
            })
        } else {
          cardTl.to(`.cars__image.${activeClass}`, {
            duration: 1,
            scale: 1.05,
            opacity: 1,
          }).to(`.cars__model-name.${activeClass}`, {
            duration: 1,
            opacity: 1,
          }, '-=1').to(`.cars__card.${activeClass}`, {
            duration: 1,
            height: `${initialHeightCard.current * 2 - 20}px`,
          }, '-=1')
        }
        break;
      default:
        if (mediaToChangeAnimation) {
          cardTl.to(`.cars__card.${activeClass}`, {
            duration: 1,
            height: `${initialHeightCard.current}px`,
          })
            .to(`.cars__model-name-hover.${activeClass}`, {
              duration: 0,
              animationPlayState: 'running',
              className: `cars__model-name-hover ${activeClass}`,
            })
            .to(`.cars__image.${activeClass}`, {
              duration: 0,
              className: `cars__image ${activeClass}`,
            })
        } else {
          cardTl.to(`.cars__card.${activeClass}`, {
            duration: 1,
            height: `${initialHeightCard.current}px`,
          }).to(`.cars__image.${activeClass}`, {
            duration: 1,
            scale: 1,
            opacity: 0.1,
          }).to(`.cars__model-name.${activeClass}`, {
            duration: 1,
            opacity: 0.1,
          }, '-=1')
        }
        break;
    }
  }

  const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

  const handleInfoCreated = () => {
    const infoHeight = document.querySelector('.cars__info-message').getBoundingClientRect().height;
    switch (infoHeight > 0) {
      case false:
        gsap.to('.cars__info-message', {
          duration: 0.5,
          scaleY: 1,
          onComplete: () => {
            hideMessage.current = setTimeout(() => {
              gsap.to('.cars__info-message', {
                duration: 0.5,
                scaleY: 0,
              })
            }, 3000)
          }
        })
        break;
      default:
        gsap.to('.cars__info-message', {
          duration: 0.5,
          scaleY: 0,
          onComplete: () => clearInterval(hideMessage.current),
        })
        break;
    }
  }

  const buildCards = () => {
    const numberOfElements = isDesktopOrLaptop ? 3 : (isTablet ? 2 : 1);
    const numberOfSlides = Math.ceil(user.cars.length / numberOfElements);
    return Array(numberOfSlides).fill('').map((slide, iSlide) => (
      <div className="swiper-slide cars__swiper-slide" key={iSlide}>
        {user.cars.map((car, iCar) => (iCar < (numberOfElements * iSlide + numberOfElements) && iCar >= iSlide * numberOfElements) ?
          <div className={`cars__card car${iCar + 1}`} key={iCar} data-id={`car${iCar + 1}`} onClick={handleCard}>
            <div className={`cars__content --image car${iCar + 1}`}>
              <h1 className={`cars__model-name car${iCar + 1}`}>
                <span className={`cars__model-name-hover car${iCar + 1}`}>{car.model}</span>{capitalize(car.model)}</h1>
              <img src={imageCars[car.model]} alt={car.model} className={`cars__image car${iCar + 1}`} />
            </div>
            <div className="cars__content --description">
              <div className="cars__content-parameter">
                <p className="cars__content-parameter-name">Paint: </p>
                <p className="cars__content-parameter-value">{car.paint.name}
                  <span className="cars__content-parameter-value--color" style={{ background: `${car.paint.color}` }}></span></p>
              </div>
              <div className="cars__content-parameter">
                <p className="cars__content-parameter-name">Rims: </p>
                <p className="cars__content-parameter-value">{car.rims.name}
                  <span className="cars__content-parameter-value--color" style={{ background: `${car.rims.color}` }}></span></p>
              </div>
              <div className="cars__content-parameter">
                <p className="cars__content-parameter-name">Top View: </p>
                <p className="cars__content-parameter-value">{car.topView.name}</p>
              </div>
              {car.details.map(detail => (
                <div className="cars__content-parameter" key={detail.name}>
                  <p className="cars__content-parameter-name">{detail.name}:</p>
                  <p className="cars__content-parameter-value">{detail.selected ? 'Selected' : 'Unselected'}</p>
                </div>
              ))}
            </div>
            {(iCar === 0 && configurator.model) && <div className="cars__info-created" data-id="info" onClick={handleInfoCreated}>
              <span className="fas fa-exclamation cars__info-icon"></span>
              <div className="cars__info-message">You just created this car</div>
            </div>}
          </div>
          : null)}
      </div>
    ))
  }

  return (
    <div className="cars-container cars">
      <div className={user.cars.length > 0 ? "swiper-container cars__swiper-container" : "swiper-container cars__swiper-container swiper-no-swiping"}>
        <div className="swiper-wrapper cars__swiper-wrapper">
          {user.cars.length > 0 ? buildCards() : <p className="cars__empty">You haven't created any cars yet. Please, go to <Link to="/customisations">Customisations</Link> and create one.</p>}
        </div>
        <div className="cars__pagination"></div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  configurator: state.configurator,
})

export default connect(mapStateToProps)(Cars);