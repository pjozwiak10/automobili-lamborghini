import React, { useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { stopAniHome } from '../actions/animationActions';
import galleryImg1 from '../images/home-gallery/lamborghini-gallery-home.jpg';
import galleryImg2 from '../images/home-gallery/lamborghini-gallery-home2.jpg';
import Swiper from 'swiper';
import huracan from '../images/home-main/huracan.png';
import gallardo from '../images/home-main/gallardo.png';
import aventador from '../images/home-main/aventador.png';
import murcielago from '../images/home-main/murcielago.png';
import urus from '../images/home-main/urus.png';
import gsap from 'gsap';

const Home = ({ stopAniHome, animation, dimensions }) => {
  const durationResize = useRef(0);
  const swiper = useRef(null);

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' });

  useEffect(() => {
    gsap.to('.home', { duration: durationResize.current, height: isDesktopOrLaptop ? dimensions.height : dimensions.height - 60 });
  }, [dimensions.height, isDesktopOrLaptop]);

  useEffect(() => {
    const i = Swiper.prototype.init;
    Swiper.prototype.init = function () {
      this.touchEventsData.formElements = '*';
      i.call(this);
    };
    // eslint-disable-next-line
    swiper.current = new Swiper('.swiper-container-home', {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    });
    document.querySelector('.swiper-notification').remove();
    if (!animation) {
      const tl = gsap.timeline({ delay: 0.5 });
      tl.to('.home__additional-background', {
        duration: 0,
        transformOrigin: 'right top',
        visibility: 'visible',
      })
        .to('.home', {
          duration: 0,
          visibility: 'visible',
        })
        .from('.home__additional-background', {
          duration: 1,
          scaleX: 0,
          opacity: 0,
          ease: 'power3.inOut',
        })
        .from('.home', {
          duration: 1.5,
          delay: 0.2,
          height: 0,
          top: isDesktopOrLaptop ? window.innerHeight / 2 : (window.innerHeight / 2) - 30,
          ease: 'power3.inOut',
        })
        .from('.home__main-slogan', {
          duration: 0.4,
          y: '100%',
          stagger: 0.2,
        })
        .from('.home__main-slogan-small', {
          duration: 0.5,
          x: 40,
          opacity: 0,
        })
        .from('.home__model-car', {
          duration: 0.3,
          opacity: 0,
          y: 30,
        }, '-=0.5')
        .from('.home__header-link', {
          duration: 0.3,
          opacity: 0,
          y: 30,
        }, '-=0.5')
        .from('.swiper-container', {
          duration: 0.5,
          x: -60,
          opacity: 0,
          pointerEvents: 'none',
        }, '-=0')
        .from('.home__gallery-inner', {
          duration: 0.5,
          x: '100%',
          opacity: 0,
          onComplete: () => durationResize.current = 0.4,
        }, '-=0.5')
      if (isDesktopOrLaptop) {
        gsap.from('.swiper-pagination', {
          duration: 0.3,
          opacity: 0,
          delay: 3,
        })
      }
      stopAniHome();
    }

  }, [animation, stopAniHome, isDesktopOrLaptop]);

  const changeText = useCallback(() => {
    setTimeout(() => {
      if (!document.querySelector('.swiper-slide-active')) return
      if (!document.querySelector('.home__model-car')) return;
      const currentMove = document.querySelector('.swiper-slide-active').dataset.move;
      gsap.to('.home__model-car', {
        duration: 0.4,
        y: currentMove,
      })
    }, 400)
  }, [])

  useEffect(() => {
    document.querySelector('.swiper-container-home').addEventListener('mouseup', changeText)
    document.querySelector('.swiper-container-home').addEventListener('touchend', changeText)

    return () => {
      document.querySelector('.swiper-container-home').removeEventListener('mouseup', changeText)
      document.querySelector('.swiper-container-home').removeEventListener('touchend', changeText)
    }
  }, [changeText])

  return (
    <>
      <div className="home__additional-background"></div>
      <section className="home" style={{ visibility: animation ? 'visible' : null }}>
        <header className="home__header">
          <div className="home__model-car-container">
            <div className="home__model-car-moving">
              <p className="home__model-car">Huracan</p>
              <p className="home__model-car">Gallardo</p>
              <p className="home__model-car">Aventador</p>
              <p className="home__model-car">Murcielago</p>
              <p className="home__model-car">Urus</p>
            </div>
          </div>
          <Link className="home__header-link" to="/test-ride">
            <p className="home__ride-text home__ride-text">schedule a</p>
            <p className="home__ride-text home__ride-text--margin">test ride</p>
          </Link>
        </header>
        <main className="home__main">
          {isDesktopOrLaptop && <div className="swiper-pagination swiper-pagination-home"></div>}
          <div className="home__main-slogan-container">
            <div className="home__main-slogan-overflow">
              <h1 className="home__main-slogan">we create</h1>
            </div>
            <div className="home__main-slogan-overflow">
              <h1 className="home__main-slogan home__main-slogan--white">the future.</h1>
            </div>
            <p className="home__main-slogan-small">welcome to our world</p>
          </div>
          <div className="swiper-container swiper-container-home">
            <div className="swiper-wrapper">
              <div className="swiper-slide swiper-slide-home" data-move="0%"><img src={huracan} alt="huracan" className="home__swiper-image --huracan" data-move="0%" /></div>
              <div className="swiper-slide swiper-slide-home" data-move="-100%"><img src={gallardo} alt="gallardo" className="home__swiper-image --gallardo" /></div>
              <div className="swiper-slide swiper-slide-home" data-move="-200%"><img src={aventador} alt="aventador" className="home__swiper-image --aventador" /></div>
              <div className="swiper-slide swiper-slide-home" data-move="-300%"><img src={murcielago} alt="murcielago" className="home__swiper-image --murcielago" /></div>
              <div className="swiper-slide swiper-slide-home" data-move="-400%"><img src={urus} alt="urus" className="home__swiper-image --urus" /></div>
            </div>
          </div>
        </main>
        <div className="home__gallery">
          <div className="home__gallery-inner">
            <div className="home__gallery-content">
              <Link className="home__gallery-link" to="/gallery">
                <p className="home__gallery-link-text home__gallery-link-text--margin">view</p>
                <p className="home__gallery-link-text">gallery</p>
              </Link>
            </div>
            <img src={galleryImg1} alt="lamborghini" className="home__gallery-image" />
            {isDesktopOrLaptop && <img src={galleryImg2} alt="lamborghini" className="home__gallery-image" />}
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  animation: state.animation,
})

const mapDispatchToProps = ({
  stopAniHome,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);