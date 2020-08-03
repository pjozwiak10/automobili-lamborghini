import React, { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Swiper from 'swiper';
import { modelsData } from '../data/customisations/customisations';
import gsap from 'gsap';
import Configurator from '../components/customisations/Configurator';
import Loader from '../components/loader/Loader';
import { connect } from 'react-redux';

const Customisations = ({ user }) => {
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  const models = useRef(modelsData);
  const configurator = useRef(null);
  const openConfigurator = useRef(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [stateLoader, setStateLoader] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const descriptionContainer = useRef(null);
  const description = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line
    const swiper = new Swiper('.customisations__swiper-container', {
      slidesPerGroup: 1,
      slidesPerView: 1,
      breakpoints: {
        768: {
          slidesPerGroup: 1,
          slidesPerView: 3,
        },
      },
      slideActiveClass: 'customisations__current-model',
      loop: true,
      centeredSlides: true,
      loopAdditionalSlides: 10,
      loopedSlides: 5,
      navigation: {
        nextEl: '.customisations__arrow.next',
        prevEl: '.customisations__arrow.prev',
      },
      pagination: {
        el: '.customisations__swiper-pagination',
        bulletClass: 'customisations__swiper-bullet',
        bulletActiveClass: 'customisations__swiper-bullet-active',
        clickable: true,
        renderBullet: (index, className) => `<span class="${className}" data-group='bullet' data-id=${models.current[index].name}>${models.current[index].name}</span>`
      },
    });

    const bullets = document.querySelectorAll('.customisations__swiper-bullet');
    bullets.forEach(bullet => bullet.addEventListener('click', handleMoveDescription));

    const handleDescriptionMovingHeight = () => {
      const height = +getComputedStyle(descriptionContainer.current).height.slice(0, -2);
      if (isTablet) description.current.style.height = `${height / 2}px`;
      else description.current.style.height = `${(window.innerHeight - 120) * 0.45 * 0.675}px`;
    }
    handleDescriptionMovingHeight();

    window.addEventListener('resize', handleDescriptionMovingHeight);

    return () => {
      window.removeEventListener('resize', handleDescriptionMovingHeight);
    }
  }, [isTablet])

  const handleMoveDescription = (e) => {
    const group = e.target.dataset.group;
    let moveValue;
    switch (group) {
      case 'bullet':
        const id = e.target.dataset.id;
        moveValue = models.current.filter(model => model.name === id)[0].move;
        gsap.to('.customisations__description-moving', {
          duration: 0.6,
          y: moveValue,
        })
        break;
      case 'arrow':
        const currentModel = document.querySelector('.customisations__current-model').dataset.id;
        moveValue = models.current.filter(model => model.name === currentModel)[0].move;
        gsap.to('.customisations__description-moving', {
          duration: 0.6,
          y: moveValue,
        })
        break;
      default:
        return;
    }
  }

  useEffect(() => {
    if (!user.isAuthenticated && openConfigurator.current) {
      clearTimeout(openConfigurator.current);
      setErrorMsg('Unauthorized, please login!');
      setStateLoader(false);
      setSelectedModel(null);
    }
    if (!user.isAuthenticated && selectedModel && !openConfigurator.current) {
      window.location.reload();
    }
  }, [user.isAuthenticated, selectedModel])

  const chooseModel = () => {
    if (disabledButton) return;
    if (!user.isAuthenticated) { setErrorMsg('Unauthorized, please login!'); return; }
    setDisabledButton(true);
    setTimeout(() => setDisabledButton(false), 5000);
    setSelectedModel(document.querySelector('.customisations__current-model').dataset.id);
    setStateLoader(true);
    setErrorMsg('');
    openConfigurator.current = setTimeout(() => {
      setStateLoader(false);
      configurator.current.scrollIntoView({ behavior: 'smooth' });
      openConfigurator.current = null;
    }, 4500)
  }

  const handleRippleEffect = (e) => {
    const root = document.documentElement;
    const element = e.target;
    const x = (e.clientX - element.getBoundingClientRect().left) / element.offsetWidth;
    const y = (e.clientY - element.getBoundingClientRect().top) / element.offsetHeight;
    root.style.setProperty('--ripple-x', x);
    root.style.setProperty('--ripple-y', y);
  }

  return (
    <section className="customisations">
      <div className="customisations__select">
        <div className="customisations__header">
          <h1 className="customisations__title">select model</h1>
        </div>
        <main className="customisations__main">
          <div className="customisations__arrow prev" data-group='arrow' onClick={handleMoveDescription}><span className="fas fa-chevron-left customisations__chevron"></span></div>
          <div className="customisations__arrow next" data-group='arrow' onClick={handleMoveDescription}><span className="fas fa-chevron-right customisations__chevron"></span></div>
          <div className=" swiper-container customisations__swiper-container swiper-no-swiping">
            <div className="swiper-wrapper customisations__swiper-wrapper">
              {models.current.map(model => (
                <div className="swiper-slide customisations__swiper-slide" key={model.name} data-id={model.name}>
                  <div className="customisations__image-container">
                    <img src={model.img} alt={model.name} className={`${model.name === 'aventador' ? 'customisations__image aventador' : 'customisations__image'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="customisations__description-container" ref={descriptionContainer}>
            <div className="customisations__description" ref={description}>
              <div className="customisations__description-moving">
                {models.current.map(model => (
                  <p className="customisations__description-text" key={model.description}>{model.description}</p>
                ))}
              </div>
            </div>
            <div className="customisations__button-container">
              <button className="customisations__select-button ripple" onMouseDown={handleRippleEffect} onClick={chooseModel}>
                Select
              {stateLoader && <Loader />}
              </button>
              {errorMsg && <span className="customisations__error-message">{errorMsg}</span>}
            </div>
          </div>
          <div className="customisations__pagination-container">
            <div className="customisations__swiper-pagination"></div>
          </div>
        </main>
      </div>
      {selectedModel ? <Configurator configurator={configurator} handleRippleEffect={handleRippleEffect} selectedModel={selectedModel} /> : null}
    </section >
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(Customisations);