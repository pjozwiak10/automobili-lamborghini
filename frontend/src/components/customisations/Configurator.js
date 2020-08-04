import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import gsap from 'gsap';
import { parametersData } from '../../data/customisations/configurator';
import { useMediaQuery } from 'react-responsive';
import Parameters from './Parameters';
import AventadorModel from './AventadorModel';
import MurcielagoModel from './MurcielagoModel';
import UrusModel from './UrusModel';
import GallardoModel from './GallardoModel';
import HuracanModel from './HuracanModel';
import Confirmation from './Confirmation';
import { connect } from 'react-redux';
import { confirmConfiguration } from '../../actions/configuratorActions';
import { addCar } from '../../actions/userActions';

const Configurator = ({ user, configurator, selectedModel, handleRippleEffect, confirmConfiguration, addCar }) => {
  const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' });

  const canvasContainerRef = useRef(null);
  const parameterValueContainer = useRef(null);

  const [parameterState, setParameterState] = useState('');
  const [carChanges, setCarChanges] = useState({ parameter: null, value: null });
  const [disabledButton, setDisabledButton] = useState(false);
  const [configuredModel, setConfiguredModel] = useState(null);
  const [configListToggle, setConfigListToggle] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    parameterValueContainer.current = configurator.current.children[2].firstChild.children[2].children;
    setConfiguredModel(state => ({
      ...state,
      model: selectedModel,
      paint: { name: 'Nero Aldebaran', color: '#1B1B1B' },
      rims: { name: 'Nero Nemesis', color: '#141414' },
      topView: { name: parametersData[2].values[0].name, id: parametersData[2].values[0].id },
      details: parametersData[3].values.map(el => ({
        name: el.name,
        id: el.id,
        selected: false,
      }))
    }))
  }, [selectedModel, configurator])

  const backToSelectModel = () => {
    if (disabledButton) return;
    gsap.to('.customisations__configurator', {
      duration: 0,
      delay: 0.5,
      onComplete: configurator.current.previousSibling.scrollIntoView({ behavior: 'smooth' }),
    })
    gsap.to('.customisations__selected-parameter', {
      duration: 0,
      delay: 0.5,
      x: isLaptop ? '-150%' : 0,
      y: isLaptop ? 0 : '150%',
      onComplete: () => setParameterState(''),
    })
    gsap.to('.customisations__configuration-list-container', {
      duration: 0,
      delay: 0.5,
      scale: 0,
      borderRadius: '50%',
      onComplete: setConfigListToggle(false),
    })
    gsap.to('.customisations__configuration-list', {
      duration: 0,
      delay: 0.5,
      opacity: 0,
    })
    if (!isLaptop) {
      gsap.to(`.customisations__hover-background`, { duration: 0.3, height: '5%' });
      gsap.to(`.customisations__hover-text`, { duration: 0.3, opacity: 0, });
    }
    setCarChanges({ parameter: null, value: null });
  }

  const setConfirmElement = (parameter) => {
    const topViewElements = [...parameterValueContainer.current];
    switch (parameter) {
      case 'top view':
        topViewElements.forEach(el => {
          if (el.dataset.id === configuredModel.topView.id) {
            el.firstChild.style.display = 'block';
          }
        })
        break;
      case 'details':
        topViewElements.forEach((el, i) => {
          if (configuredModel.details[i].selected) {
            el.firstChild.style.display = 'block';
          }
        })
        break;
      default:
        return null;
    }
  }

  const handleParametersValue = (e) => {
    if (disabledButton) return;
    setDisabledButton(true);
    setTimeout(() => {
      setDisabledButton(false)
    }, 1000)
    const parameter = e.target.dataset.parameter;
    const parameterTl = gsap.timeline();
    if (!parameterState) {
      if (!isLaptop) {
        gsap.to(`.customisations__hover-background.${parameter === 'top view' ? parameter.split(' ').join('-') : parameter}`, { duration: 0.3, height: '103%' });
        gsap.to(`.customisations__hover-text.${parameter === 'top view' ? parameter.split(' ').join('-') : parameter}`, { duration: 0.3, opacity: 1, });
      }
      parameterTl.to('.customisations__selected-parameter', {
        duration: 1,
        x: isLaptop ? '0%' : 0,
        y: isLaptop ? 0 : '0%',
        onStart: () => setParameterState(parametersData.filter(el => el.parameter === parameter)[0]),
      })
      setTimeout(() => setConfirmElement(parameter), 300)
    } else {
      if (parameterState.parameter === parameter) {
        if (!isLaptop) {
          gsap.to(`.customisations__hover-background.${parameter === 'top view' ? parameter.split(' ').join('-') : parameter}`, { duration: 0.3, height: '5%' });
          gsap.to(`.customisations__hover-text.${parameter === 'top view' ? parameter.split(' ').join('-') : parameter}`, { duration: 0.3, opacity: 0, });
        }
        parameterTl.to('.customisations__selected-parameter', {
          duration: 1,
          x: isLaptop ? '-150%' : 0,
          y: isLaptop ? 0 : '150%',
          onComplete: () => setParameterState(''),
        })
      } else {
        if (!isLaptop) {
          gsap.to(`.customisations__hover-background`, { duration: 0.3, height: '5%' });
          gsap.to(`.customisations__hover-text`, { duration: 0.3, opacity: 0, });
          gsap.to(`.customisations__hover-background.${parameter === 'top view' ? parameter.split(' ').join('-') : parameter}`, { duration: 0.3, height: '103%', delay: 1, });
          gsap.to(`.customisations__hover-text.${parameter === 'top view' ? parameter.split(' ').join('-') : parameter}`, { duration: 0.3, opacity: 1, delay: 1, });
        }
        parameterTl.to('.customisations__selected-parameter', {
          duration: 1,
          x: isLaptop ? '-150%' : 0,
          y: isLaptop ? 0 : '150%',
          onComplete: () => setParameterState(parametersData.filter(el => el.parameter === parameter)[0]),
        })
          .to('.customisations__selected-parameter', {
            duration: 1,
            x: isLaptop ? '0%' : 0,
            y: isLaptop ? 0 : '0%',
          })
        setTimeout(() => setConfirmElement(parameter), 1100)
      }
    }
  }

  const hideParametersValue = () => {
    gsap.to('.customisations__selected-parameter', {
      duration: 1,
      x: isLaptop ? '-150%' : 0,
      y: isLaptop ? 0 : '150%',
      onComplete: () => setParameterState(''),
    });
    if (!isLaptop) {
      gsap.to(`.customisations__hover-background`, { duration: 0.3, height: '5%' });
      gsap.to(`.customisations__hover-text`, { duration: 0.3, opacity: 0, });
    }
  }

  const handleModel3D = (id) => {
    const parameter = parameterState.parameter;
    const value = parameterState.values.filter(el => el.id === id)[0];
    setCarChanges({
      parameter: parameter,
      value: value.color,
    })
    setConfiguredModel({
      ...configuredModel,
      [parameter]: { name: value.name, color: value.color },
    })
  }

  const handleOptionsCar = (e, id) => {
    switch (parameterState.parameter) {
      case 'top view':
        const value = parameterState.values.filter(el => el.id === id)[0];
        const topViewElements = [...parameterValueContainer.current];
        topViewElements.forEach(el => {
          if (el.dataset.id === id) {
            el.firstChild.style.display = 'block';
            setConfiguredModel({
              ...configuredModel,
              topView: { name: value.name, id: value.id },
            })
          } else {
            el.firstChild.style.display = 'none';
          }
        })
        break;
      case 'details':
        if (e.target.previousSibling.style.display === 'block') {
          e.target.previousSibling.style.display = 'none';
          const newDetailsState = configuredModel.details.map(el => {
            if (el.id === id) {
              return {
                ...el,
                selected: false,
              }
            } else {
              return el;
            }
          })
          setConfiguredModel({
            ...configuredModel,
            details: newDetailsState,
          })
        } else {
          e.target.previousSibling.style.display = 'block';
          const newDetailsState = configuredModel.details.map(el => {
            if (el.id === id) {
              return {
                ...el,
                selected: true,
              }
            } else {
              return el;
            }
          })
          setConfiguredModel({
            ...configuredModel,
            details: newDetailsState,
          })
        }
        break;
      default:
        return null;
    }
  }

  const handleConfigurationList = (e) => {
    if (disabledButton) return;
    setDisabledButton(true);
    setTimeout(() => {
      setDisabledButton(false);
    }, 800)
    switch (configListToggle) {
      case false:
        gsap.to('.customisations__configuration-list-container', {
          duration: 0.8,
          scale: 1,
          borderRadius: '10px',
          onComplete: setConfigListToggle(true),
        })
        gsap.to('.customisations__configuration-list', {
          duration: 0.4,
          opacity: 1,
          delay: 0.6,
        })
        break;
      case true:
        gsap.to('.customisations__configuration-list', {
          duration: 0.4,
          opacity: 0,
          onComplete: setConfigListToggle(false),
        })
        gsap.to('.customisations__configuration-list-container', {
          duration: 0.8,
          scale: 0,
          borderRadius: '50%',
        })
        break;
      default:
        return;
    }
  }

  const configurationConfirmation = (configuredModel) => {
    if (disabledButton && !isLaptop) return;
    confirmConfiguration(configuredModel);
    addCar({ ...configuredModel, userId: user.personal._id })
    setTimeout(() => setRedirectToHome(true), 7000);
    setDisabledButton(true);
    gsap.to('.customisations__selected-parameter', {
      duration: 1,
      x: isLaptop ? '-150%' : 0,
      y: isLaptop ? 0 : '150%',
      onComplete: () => setParameterState(''),
    })
    gsap.to('.customisations__configuration-list', {
      duration: 0.4,
      opacity: 0,
      onComplete: setConfigListToggle(false),
    })
    gsap.to('.customisations__configuration-list-container', {
      duration: 0.8,
      scale: 0,
      borderRadius: '50%',
    })
    gsap.to('.customisations__confirmation-message', {
      duration: 0.5,
      delay: 0.4,
      scaleX: 1,
    })
    gsap.to('.customisations__confirmation-message-text', {
      duration: 0.3,
      delay: 0.7,
      opacity: 1,
    })
    if (!isLaptop) {
      gsap.to(`.customisations__hover-background`, { duration: 0.3, height: '5%' });
      gsap.to(`.customisations__hover-text`, { duration: 0.3, opacity: 0, });
    }
  }

  return (
    <div className="customisations__configurator" ref={configurator}>
      <button className="customisations__back-button" onClick={backToSelectModel}>back to model selection</button>
      <Confirmation handleRippleEffect={handleRippleEffect} configuredModel={configuredModel} handleConfigurationList={handleConfigurationList} configurationConfirmation={configurationConfirmation} />
      <Parameters selectedModel={selectedModel} parameterState={parameterState} handleModel3D={handleModel3D} hideParametersValue={hideParametersValue} handleParametersValue={handleParametersValue} handleOptionsCar={handleOptionsCar} />
      <div className="customisations__model-container" ref={canvasContainerRef}>
        {selectedModel === 'aventador' && <AventadorModel canvasContainerRef={canvasContainerRef} carChanges={carChanges} />}
        {selectedModel === 'huracan' && <HuracanModel canvasContainerRef={canvasContainerRef} carChanges={carChanges} />}
        {selectedModel === 'urus' && <UrusModel canvasContainerRef={canvasContainerRef} carChanges={carChanges} />}
        {selectedModel === 'gallardo' && <GallardoModel canvasContainerRef={canvasContainerRef} carChanges={carChanges} />}
        {selectedModel === 'murcielago' && <MurcielagoModel canvasContainerRef={canvasContainerRef} carChanges={carChanges} />}
      </div>
      {redirectToHome && <Redirect to="/" />}
    </div>
  );
}

const mapDispatchToProps = {
  confirmConfiguration,
  addCar,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps, mapDispatchToProps)(Configurator);