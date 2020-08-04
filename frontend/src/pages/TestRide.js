import React, { useEffect, useState, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import gsap from 'gsap';
import FormData from '../components/test-ride/FormData';
import FormCar from '../components/test-ride/FormCar';
import CarAnimation from '../components/test-ride/CarAnimation';

const TestRide = () => {
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  const [checkbox, setCheckbox] = useState([
    { name: 'huracan', checked: false, group: 'model' },
    { name: 'aventador', checked: false, group: 'model' },
    { name: 'gallardo', checked: false, group: 'model' },
    { name: 'murcielago', checked: false, group: 'model' },
    { name: 'urus', checked: false, group: 'model' },
    { name: 'coupe', checked: false, group: 'body' },
    { name: 'roadster', checked: false, group: 'body' },
  ])
  const [text, setText] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  })
  const [disabledInputChange, setDisabledInputChange] = useState(false)

  const dateToConfirm = useRef(null);
  const previousModel = useRef(null);

  const [submitMessage, setSubmitMessage] = useState({ msg: '', redirect: false });

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to('.test-ride', {
      duration: 0,
      visibility: 'visible',
    }).from('.test-ride__form--data', {
      duration: 1,
      left: '-150%',
    }, '+=0.3').from('.test-ride__form--car', {
      duration: 1,
      left: '150%',
    }, '-=0.5')
  }, [])

  useEffect(() => {
    const minDate = new Date(new Date().getTime() + (86400 * 1000));
    const dateElement = document.querySelector('.datepicker')
    // eslint-disable-next-line
    const instancesDate = M.Datepicker.init(dateElement, {
      disableWeekends: true,
      minDate: minDate,
      showClearBtn: true,
      onSelect: selectDate,
    });
    instancesDate.clearBtn.onclick = clearDate;
    instancesDate.doneBtn.onclick = doneDate;
  })

  const clearDate = () => {
    dateToConfirm.current = null
    setText({
      ...text,
      date: '',
    })
  }

  const selectDate = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const selectedDate = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
    dateToConfirm.current = selectedDate;
  }

  const doneDate = () => {
    setText(text => ({
      ...text,
      date: dateToConfirm.current,
    }))
  }

  const handleInputChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    if (name === 'date') return;
    if (type === 'checkbox') {
      const checked = e.target.checked;
      const group = e.target.dataset.group;
      const checkboxList = [...checkbox];
      if (group === 'model') {
        if (disabledInputChange) return;
        setDisabledInputChange(true);
        setTimeout(() => setDisabledInputChange(false), 600)
      }
      checkboxList.forEach(el => {
        if (el.group === group) {
          if (el.name === name) {
            el.checked = checked
          } else {
            el.checked = false;
          }
        }
      })
      setCheckbox(checkboxList)
      if (group === 'body') return;
      if (!isTablet) return;
      asideAnimation(name);
    } else {
      const value = e.target.value;
      setText({
        ...text,
        [name]: value,
      })
    }
  }

  const asideAnimation = (selectedModel) => {
    const models = checkbox.filter(el => el.group === 'model')
    models.forEach(model => {
      if (model.name === selectedModel) {
        if (model.checked) {
          gsap.to(`.test-ride__chosen-model.${model.name}`, {
            duration: 0,
            zIndex: 1,
          })
          gsap.to(`.test-ride__chosen-model.${model.name}`, {
            duration: 0.8,
            scaleY: 1,
            opacity: 1,
            ease: 'power3.inOut',
          })
          gsap.to(`.test-ride__chosen-image.${model.name}`, {
            duration: 0.8,
            x: 0,
            delay: 0.2,
            ease: 'power3.inOut',
          })
        } else if (!model.checked) {
          gsap.to(`.test-ride__chosen-model.${model.name}`, {
            duration: 0,
            zIndex: 'auto',
          })
          gsap.to(`.test-ride__chosen-image.${model.name}`, {
            duration: 0.4,
            x: '100%',
            ease: 'power3.inOut',
          })
          gsap.to(`.test-ride__chosen-model.${model.name}`, {
            duration: 0.4,
            scaleY: 0,
            opacity: 0,
            ease: 'power3.inOut',
          })
        }
      } else {
        if (previousModel.current === null || previousModel.current === selectedModel) return;
        gsap.to(`.test-ride__chosen-model.${previousModel.current}`, {
          duration: 0,
          zIndex: 'auto',
        })
        gsap.to(`.test-ride__chosen-model.${previousModel.current}`, {
          duration: 0.4,
          scaleY: 0,
          opacity: 0,
          ease: 'power3.inOut',
        })
        gsap.to(`.test-ride__chosen-image.${previousModel.current}`, {
          duration: 0.4,
          x: '100%',
          ease: 'power3.inOut',
        })
      }
    })
    previousModel.current = selectedModel
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, phone, date, message } = text;
    const modelObj = checkbox.filter(el => el.group === 'model').filter(el => el.checked === true)[0];
    const model = modelObj ? modelObj.name : null;
    const bodyObj = checkbox.filter(el => el.group === 'body').filter(el => el.checked === true)[0];
    const body = bodyObj ? bodyObj.name : null;
    if (!name || !email || !phone || !date || !model || !body) return setSubmitMessage(state => ({
      ...state, msg: 'Please enter all fields',
    }))
    const data = { name, email, phone, date, message, model, body };
    axios.post('/api/test-rides', data, { withCredentials: true })
      .then(res => {
        setSubmitMessage(state => ({ ...state, msg: res.data.msg }))
        setTimeout(() => setSubmitMessage(state => ({ ...state, redirect: true })), 2000)
        setText({ name: '', email: '', phone: '', date: '', message: '', })
      })
      .catch(err => setSubmitMessage(state => ({ ...state, msg: err.response.data.msg })))
  }

  return (
    <section className="test-ride">
      <h1 className="test-ride__header">Schedule A Test Ride</h1>
      <main className="test-ride__main">
        <form action="" className="test-ride__form-container" onSubmit={handleSubmit}>
          <FormData text={text} handleInputChange={handleInputChange} />
          <FormCar checkbox={checkbox} handleInputChange={handleInputChange} submitMessage={submitMessage} />
        </form>
        {isTablet && <aside className="test-ride__aside">
          <CarAnimation />
        </aside>}
      </main>
      {submitMessage.redirect && <Redirect to="/" />}
    </section>
  );
}

export default TestRide;