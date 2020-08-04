import React, { useState, useEffect, memo } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../../actions/userActions';

const SignUpSignIn = memo(({ toggleSign, sign, login, user }) => {
  const [signUpActive, setSignUpActive] = useState(false);
  const [userData, setUserData] = useState({ login: { email: '', password: '' }, register: { name: '', email: '', password: '' } });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const tl = gsap.timeline();
    if (sign) {
      tl.to('.container-panel', {
        duration: 0,
        zIndex: 15,
      })
        .to('.container-panel', {
          duration: 0.5,
          opacity: 1,
        })
        .to('.container', {
          duration: 0.5,
          x: 0,
        }, '-=0.2')
    } else if (!sign && sign !== null) {
      tl.to('.container', {
        duration: 0.5,
        x: '100vw',
      })
        .to('.container-panel', {
          duration: 0.5,
          opacity: 0,
        }, '-=0.2')
        .to('.container-panel', {
          duration: 0,
          zIndex: -10,
        })
    }

    const closePanel = (e) => {
      if (e.keyCode === 13 && sign && !signUpActive) document.querySelector('button.sign-in').focus()
      if (e.keyCode === 13 && sign && signUpActive) document.querySelector('button.sign-up').focus()
      if (e.keyCode === 27 && sign) toggleSign(false)
    }
    window.addEventListener('keydown', closePanel)

    return () => {
      window.removeEventListener('keydown', closePanel)
    }

  }, [sign, toggleSign, signUpActive])

  useEffect(() => {
    setErrorMsg(user.msg)
    if (user.isAuthenticated && sign) {
      setSuccessMsg('Login successfull')
      setTimeout(() => { toggleSign(false); setSuccessMsg('') }, 1000)
    }
  }, [user, toggleSign, sign])

  const handleInput = (e) => {
    const id = e.target.dataset.id;
    const name = e.target.name;
    const value = e.target.value;
    setUserData(state => ({
      ...state,
      [id]: { ...state[id], [name]: value },
    }));
    if (value) e.target.classList.add('valid');
    else e.target.classList.remove('valid');
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!userData.login.email || !userData.login.password) return setErrorMsg('Please enter all fields');
    const loginData = {
      email: userData.login.email,
      password: userData.login.password,
    };
    login(loginData)

    setUserData({ login: { email: '', password: '' }, register: { name: '', email: '', password: '' } })
    Array(...e.target.elements).forEach(el => { el.classList.remove('valid') });
  }

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (!userData.register.name || !userData.register.email || !userData.register.password) return setErrorMsg('Please enter all fields');
    const registrationData = {
      name: userData.register.name,
      email: userData.register.email,
      password: userData.register.password,
    }
    Array(...e.target.elements).forEach(el => { el.classList.remove('valid') });
    setUserData({ login: { email: '', password: '' }, register: { name: '', email: '', password: '' } })
    axios.post('/api/registration', registrationData)
      .then(res => {
        setErrorMsg('');
        setSuccessMsg('Registration successfull, Please login')
        setTimeout(() => { setSignUpActive(false); setSuccessMsg('') }, 1000)
      })
      .catch(err => {
        setErrorMsg(err.response.data.msg);
      })
  }

  return (
    <div className="container-panel">
      <div className={signUpActive ? "container sign-up-panel-active" : 'container'} id="container">
        <div className="container__exit" onClick={() => { toggleSign(false); setErrorMsg('') }}>X</div>
        <div className="form-container sign-up-container">
          <form className="form-container__form form" onSubmit={handleSubmitRegister}>
            <h1 className="form__header">Create Account</h1>
            <div className="form__social-container">
              <a href="/" className="form__social"><i className="fab fa-facebook-f"></i></a>
              <a href="/" className="form__social"><i className="fab fa-google-plus-g"></i></a>
              <a href="/" className="form__social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span className="form__span">or use your email for registration</span>
            <div className="form__container-input">
              <input className="form__input browser-default" type="text" data-id='register' name='name' value={userData.register.name} onChange={handleInput} />
              <label htmlFor="" className="form__label">
                <span className="form__label-text">Name</span>
              </label>
            </div>
            <div className="form__container-input">
              <input className="form__input browser-default" type="text" data-id='register' name='email' value={userData.register.email} onChange={handleInput} />
              <label htmlFor="" className="form__label">
                <span className="form__label-text">Email</span>
              </label>
            </div>
            <div className="form__container-input">
              <input className="form__input browser-default" autoComplete="false" type="password" data-id='register' name='password' value={userData.register.password} onChange={handleInput} />
              <label htmlFor="" className="form__label">
                <span className="form__label-text">Password</span>
              </label>
            </div>
            <button className="form__button sign-up">Sign Up</button>
            {errorMsg && <span className="form__form-message error registration">{errorMsg}</span>}
            {successMsg && <span className="form__form-message success registration">{successMsg}</span>}
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className="form-container__form form" onSubmit={handleSubmitLogin}>
            <h1 className="form__header">Sign in</h1>
            <div className="form__social-container">
              <a href="/" className="form__social"><i className="fab fa-facebook-f"></i></a>
              <a href="/" className="form__social"><i className="fab fa-google-plus-g"></i></a>
              <a href="/" className="form__social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span className="form__span">or use your account</span>
            <div className="form__container-input">
              <input className="form__input browser-default" type="text" data-id='login' name='email' value={userData.login.email} onChange={handleInput} />
              <label htmlFor="" className="form__label">
                <span className="form__label-text">Email</span>
              </label>
            </div>
            <div className="form__container-input">
              <input className="form__input browser-default" autoComplete="false" type="password" data-id='login' name='password' value={userData.login.password} onChange={handleInput} />
              <label htmlFor="" className="form__label">
                <span className="form__label-text">Password</span>
              </label>
            </div>
            <a className="form__reminder" href="/">Forgot your password?</a>
            <button className="form__button sign-in">Sign In</button>
            {errorMsg && <span className="form__form-message error">{errorMsg}</span>}
            {successMsg && <span className="form__form-message success">{successMsg}</span>}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay__overlay-panel overlay-left">
              <h1 className="overlay__header">Welcome Back!</h1>
              <p className="overlay__text">To keep connected with us please login with your personal info</p>
              <button className="overlay__button-ghost" id="signIn" onClick={() => { setSignUpActive(false); setErrorMsg('') }}>Sign In</button>
            </div>
            <div className="overlay__overlay-panel overlay-right">
              <h1 className="overlay__header">Hello, Friend!</h1>
              <p className="overlay__text">Enter your personal details and start journey with us</p>
              <button className="overlay__button-ghost" id="signUp" onClick={() => { setSignUpActive(true); setErrorMsg('') }}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const mapDispatchToProps = {
  login
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpSignIn);