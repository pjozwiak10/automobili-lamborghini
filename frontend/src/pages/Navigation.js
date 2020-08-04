import React, { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import logo from '../images/logo/lamborghini.svg';
import gsap from 'gsap';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';
import { deleteConfiguration } from '../actions/configuratorActions';
const Cars = lazy(() => import('../components/navigation/Cars'));
const Menu = lazy(() => import('../components/navigation/Menu'));
const SignUpSignIn = lazy(() => import('../components/navigation/SignUpSignIn'));

const Navigation = ({ user, logout, history, deleteConfiguration, dimensions }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' })

  const [menu, toggleMenu] = useState(null);
  const [disabledMenuBtn, setDisabledMenuBtn] = useState(true);
  const [sign, toggleSign] = useState(null);
  const [cars, toggleCars] = useState(null);

  useEffect(() => {
    if (cars) {
      history.listen(() => {
        toggleCars(false)
      })
    }
  }, [cars, history])

  useEffect(() => {
    if (user.isAuthenticated) {
      gsap.to('.navigation__button-container.--cars', {
        duration: 0,
        opacity: 1,
        delay: 0.5,
      });
      gsap.from('.navigation__user', {
        duration: 1,
        opacity: 0,
        delay: 1.3,
      });
      gsap.from('.navigation__btn-cars', {
        duration: 1,
        opacity: 0,
        delay: 1.4,
      })
    }
  }, [user.isAuthenticated])

  useEffect(() => {

    setTimeout(() => {
      setDisabledMenuBtn(false)
    }, 2500)

    const tl = gsap.timeline();
    if (isDesktopOrLaptop) {
      tl.to('.navigation', {
        duration: 0,
        transformOrigin: 'left top',
        visibility: 'visible',
      })
        .from('.navigation', {
          duration: 1,
          delay: 0.1,
          scaleX: 0,
          opacity: 0,
          ease: 'power3.inOut',
        })
        .from('.navigation__logo', {
          duration: 0.5,
          opacity: 0,
          x: '-100%',
        }, '+=0.3')
        .from('.navigation__btn', {
          duration: 0.5,
          y: 50,
          opacity: 0,
          stagger: 0.2,
        }, '-=0.3')
        .from('.navigation__social-link', {
          duration: 0.3,
          opacity: 0,
          x: 20,
          stagger: 0.3,
        }, '-=0.2')
        .from('.navigation__content-slogan', {
          duration: 0.5,
          x: 30,
          opacity: 0,
        })
    } else {
      tl.to('.navigation', {
        duration: 0,
        transformOrigin: 'left top',
        visibility: 'visible',
      }).from('.navigation', {
        duration: 1,
        delay: 0.1,
        scaleX: 0,
        opacity: 0,
        ease: 'power3.inOut',
      }).from('.navigation__logo', {
        duration: 0.5,
        opacity: 0,
        x: '-100%',
      }, '+=0.3')
        .from('.navigation__btn', {
          duration: 0.5,
          x: '100%',
          opacity: 0,
          stagger: 0.2,
        }, '-=0.3')
    }
  }, [isDesktopOrLaptop])

  const handleMenu = useCallback(() => {
    toggleMenu(!menu)
    setDisabledMenuBtn(true)
    setTimeout(() => {
      setDisabledMenuBtn(false)
    }, 900)
  }, [menu])

  const handleCars = useCallback(() => {
    toggleCars(!cars)
    setDisabledMenuBtn(true)
    setTimeout(() => {
      setDisabledMenuBtn(false)
    }, 900)
  }, [cars]);

  const handleLogout = useCallback(() => {
    logout();
    toggleCars(false);
    deleteConfiguration();
  }, [deleteConfiguration, logout])

  return (
    <>
      <Suspense fallback>
        <Menu menu={menu} toggleMenu={toggleMenu} dimensions={dimensions} />
        <SignUpSignIn toggleSign={toggleSign} sign={sign} />
      </Suspense>
      <Suspense fallback>
        {user.isAuthenticated ? <Cars cars={cars} dimensions={dimensions} /> : null}
      </Suspense>
      <nav className="navigation">
        <div className="navigation__inner">
          <div className="navigation__logo-container">
            <Link to="/" className="navigation__logo-link">
              <img src={logo} alt="logo" className="navigation__logo" />
            </Link>
          </div>
          <div className="navigation__content">
            <div className="navigation__content-container">
              <div className="navigation__button-container --menu">
                <button className="navigation__btn --menu" disabled={disabledMenuBtn} onClick={handleMenu}>Menu</button>
              </div>
              <div className="navigation__button-container --sign">
                {user.isAuthenticated ? <button className="navigation__btn --sign-out" onClick={handleLogout}>Sign Out
                </button>
                  :
                  <button className="navigation__btn --sign-in-up" onClick={() => toggleSign(true)}>Sign Up / Sign In</button>
                }
              </div>
              {user.isAuthenticated ? <>
                <p className="navigation__user">Welcome, <strong>{user.personal.name}</strong></p>
                <div className="navigation__button-container --cars">
                  <button className="navigation__btn-cars --cars" disabled={disabledMenuBtn} onClick={handleCars}>Your Cars</button>
                </div>
              </>
                : null}
            </div>
            {isDesktopOrLaptop && <p className="navigation__content-slogan">BeVisionary</p>}
          </div>
          {isDesktopOrLaptop && <div className="navigation__social-media">
            <a href="https://www.facebook.com/" className="navigation__social-link facebook">fb</a>
            <a href="https://www.instagram.com/?hl=pl" className="navigation__social-link instagram">insta</a>
            <a href="https://twitter.com/explore" className="navigation__social-link twitter">tw</a>
            <a href="/" className="navigation__social-link share">share</a>
          </div>}
        </div>
      </nav>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = {
  logout,
  deleteConfiguration,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));