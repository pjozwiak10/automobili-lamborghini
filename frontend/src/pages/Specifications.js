import React, { useState, useRef } from 'react';
import { versionsData } from '../data/specifications/versions';
import gsap from 'gsap';
import SelectList from '../components/specifications/SelectList';
import ContentSelected from '../components/specifications/ContentSelected';
import SpecificationSelected from '../components/specifications/SpecificationSelected';

const Specifications = () => {

  const [versionsState, setVersionsState] = useState(null);
  const [specificationState, setSpecificationState] = useState({ specification: '' });
  const [disableButton, setDisabledButton] = useState(false);
  const contentContainer = useRef(null);

  const handleVersions = (e) => {
    if (disableButton) return;
    setDisabledButton(true);
    setTimeout(() => {
      setDisabledButton(false);
    }, 500)
    const id = e.target.dataset.id;
    const versionsTl = gsap.timeline();
    if (versionsState !== null) {
      if (versionsState.model === id) {
        versionsTl.to('.specifications__content-selected', {
          duration: 0.5,
          x: '-110%',
        })
        setTimeout(() => setVersionsState(null), 500)
      } else {
        versionsTl.to('.specifications__content-selected', {
          duration: 0.5,
          x: '-110%',
        })
        setTimeout(() => {
          versionsTl.to('.specifications__content-selected', {
            duration: 0.5,
            x: 0,
          })
          const filteredVersions = versionsData.filter(el => el.model === id)[0];
          setVersionsState(filteredVersions)
        }, 500)
      }
    } else {
      versionsTl.to('.specifications__content-selected', {
        duration: 0.5,
        x: 0,
      })
      const filteredVersions = versionsData.filter(el => el.model === id)[0];
      setVersionsState(filteredVersions);
    }
  }

  const hoverEnter = (e) => {
    gsap.to(e.target.firstChild, {
      duration: 0.4,
      x: 15,
      skewX: 5,
      ease: 'power3.inOut',
      color: '#000',
    })
  }

  const hoverExit = (e) => {
    gsap.to(e.target.firstChild, {
      duration: 0.4,
      x: 0,
      skewX: 0,
      ease: 'power3.inOut',
      color: '#fff',
    })
  }

  const showSpecification = (id) => {
    if (disableButton) return;
    setDisabledButton(true);
    setTimeout(() => {
      setDisabledButton(false);
    }, 3000)
    contentContainer.current.scrollTo({
      top: 0,
      left: 0,
    })
    setSpecificationState(versionsState.versions.filter(el => el.id === id)[0]);
    const specificationTl = gsap.timeline();

    specificationTl.to('.specifications__specification-selected', {
      duration: 0.8,
      x: 0,
      ease: 'power3.inOut',
      delay: 0.2,
    })
      .to('.specifications__specification-selected', {
        duration: 0.8,
        scaleY: 1,
        ease: 'power3.inOut',
      })
      .to('.specifications__specification-content-container', {
        duration: 0.4,
        opacity: 1,
      })
      .to('.specifications__close-specification', {
        duration: 0.4,
        opacity: 1,
      }, '-=0.4')
      .to('.specifications__specification-image-container', {
        duration: 0.5,
        opacity: 1,
        y: 0,
      })
      .to('.specifications__specification-description', {
        duration: 0.5,
        opacity: 1,
        y: 0,
        stagger: 0.2,
      }, '-=0.3')
  }

  const hideSpecification = () => {
    if (disableButton) return;
    setDisabledButton(true);
    setTimeout(() => {
      setDisabledButton(false);
    }, 3000)

    const specificationTl = gsap.timeline();
    specificationTl.to('.specifications__specification-image-container', {
      duration: 0.5,
      opacity: 0,
      y: -50,
    })
      .to('.specifications__specification-description', {
        duration: 0.5,
        opacity: 0,
        y: -50,
        stagger: 0,
      }, '-=0.5')
      .to('.specifications__specification-image-container', {
        duration: 0,
        y: 50,
      })
      .to('.specifications__specification-description', {
        duration: 0,
        y: 50,
        stagger: 0,
      })
      .to('.specifications__specification-content-container', {
        duration: 0.4,
        opacity: 0,
      })
      .to('.specifications__close-specification', {
        duration: 0.4,
        opacity: 0,
      }, '-=0.4')
      .to('.specifications__specification-selected', {
        duration: 0.8,
        scaleY: 0.015,
        ease: 'power3.inOut',
        delay: 0.2,
      })
      .to('.specifications__specification-selected', {
        duration: 0.8,
        x: '100%',
        ease: 'power3.inOut',
        onComplete: () => setSpecificationState({ specification: '' }),
      })
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
    <section className="specifications">
      <div className="specifications__header-container">
        <h1 className="specifications__header">specifications</h1>
      </div>
      <div className="specifications__main-container">
        <SpecificationSelected specificationState={specificationState} hideSpecification={hideSpecification} contentContainer={contentContainer} />
        <ContentSelected hoverEnter={hoverEnter} hoverExit={hoverExit} versionsState={versionsState} showSpecification={showSpecification} handleRippleEffect={handleRippleEffect} />
        <SelectList handleVersions={handleVersions} handleRippleEffect={handleRippleEffect} />
      </div>
    </section>
  );
}

export default Specifications;