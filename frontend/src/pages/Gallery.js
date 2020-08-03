import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { useMediaQuery } from 'react-responsive';
import gsap from 'gsap';
import { cardsData } from '../data/gallery/gallery';

const Gallery = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  const [activeImage, setActiveImage] = useState(true);
  const [classToDecrease, setClassToDecrease] = useState(null);

  const cardTl = useRef(null);
  let swiperWrapper = useRef(null);
  let swiperSlideRef = useRef(null);
  let beginningHeightCardRef = useRef(null);
  let paddingLeftGalleryRef = useRef(null);

  useEffect(() => {
    cardTl.current = gsap.timeline();
    setTimeout(() => setActiveImage(false), 500)
    // eslint-disable-next-line
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      breakpoints: {
        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1280: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      }
    });

    const cardOpenTl = gsap.timeline();

    cardOpenTl.to('.gallery', {
      duration: 0,
      visibility: 'visible',
    })
      .from('.gallery__card', {
        duration: 0.4,
        y: 75,
        delay: 0.2,
        opacity: 0,
        stagger: 0.2,
      })

    swiperSlideRef.current = swiperWrapper.firstChild;
    beginningHeightCardRef.current = getComputedStyle(swiperWrapper.firstChild.firstChild.firstChild).height;
    paddingLeftGalleryRef.current = getComputedStyle(swiperWrapper.parentNode.parentNode.parentNode).paddingLeft;

  }, [])

  const checkDocumentPaddingLeft = () => {
    if (document.body.clientWidth > 1440) return (document.body.clientWidth - 1440) / 2
    else return 0
  }

  const increaseImage = (e) => {
    if (activeImage) return;
    const classActive = e.target.dataset.id;
    setClassToDecrease(classActive);
    setActiveImage(true);
    const swiperSlide = swiperSlideRef.current;
    const paddingString = (getComputedStyle(swiperSlide).paddingLeft);
    const padding = +paddingString.slice(-paddingString.length, -2);
    const slideWidthString = (swiperSlide.style.width);
    const slideWidth = +slideWidthString.slice(-slideWidthString.length, -2);
    const cardWidth = slideWidth - 2 * padding;
    document.querySelector(`.gallery__card.${classActive}`).style.width = cardWidth + 'px';
    const swiperWrapperTranslateX = swiperWrapper.getBoundingClientRect().left
    const paddingLeftGallery = +paddingLeftGalleryRef.current.slice(-paddingLeftGalleryRef.current, -2);
    const documentPaddingLeft = checkDocumentPaddingLeft();
    const cardLeft = paddingLeftGallery + documentPaddingLeft - swiperWrapperTranslateX;

    if (!isTablet) {
      gsap.to(`.gallery__description-button.${classActive}`, {
        duration: 0,
        display: 'block',
        delay: 1,
      })
    }

    cardTl.current
      .to(`.gallery__image-container.${classActive}`, {
        duration: 0.5,
        opacity: 0,
      })
      .to(`.gallery__content.${classActive}`, {
        duration: 0.5,
        opacity: 0,
      }, '-=0.25')
      .to(`.gallery__card.${classActive}`, {
        duration: 0,
        delay: 0.5,
        position: 'absolute',
        zIndex: '1',
      })
      .to(`.gallery__card.${classActive}`, {
        duration: 1,
        width: '100%',
        height: '100%',
        left: cardLeft,
        ease: 'power3.inOut',
      })
      .to(`.gallery__card.${classActive}`, {
        duration: 0,
        gridTemplateAreas: isTablet ? '"main-image description" "content description" "small-image description"'
          : '"main-image" "content" "small-image"',
        gridTemplateColumns: isDesktop ? '50% 50%' : (isTablet ? '60% 40%' : '95%'),
        gridTemplateRows: '52.5% 20% 27.5%',
        padding: isTablet ? '20px' : '15px',
        cursor: 'auto',
      })
      .to(`.gallery__image-container.${classActive}`, {
        duration: 0,
        height: '100%',
      })
      .to(`.gallery__image.${classActive}`, {
        duration: 0,
        scale: 1.11,
        y: 0,
      })
      .to(`.gallery__small-image-container.${classActive}`, {
        duration: 0,
        display: 'flex',
      })
      .to(`.gallery__description.${classActive}`, {
        duration: 0,
        display: 'flex',
      })
      .to(`.gallery__additional.${classActive}`, {
        duration: 0,
        display: 'none',
      })
      .to(`.gallery__image-container.${classActive}`, {
        duration: 0.5,
        opacity: 1,
        border: '2px solid #fff',
      })
      .to(`.gallery__content.${classActive}`, {
        duration: 0.5,
        paddingLeft: 0,
        opacity: 1,
      }, '-=0.25')
      .to(`.gallery__small-image-container.${classActive}`, {
        duration: 0.5,
        opacity: 1,
        y: 0,
      }, '-=0.25')
      .to(`.gallery__description.${classActive}`, {
        duration: 0.5,
        opacity: isTablet ? 1 : null,
        x: isTablet ? 0 : null,
      }, '-=0.25')
      .to('.gallery__cancel-image', {
        duration: 0,
        display: 'block',
      })
      .to('.gallery__cancel-image', {
        duration: 0.5,
        opacity: 1,
        y: 0,
      })
  }

  const decreaseImage = (e) => {
    const classActive = e.target.dataset.id;
    setTimeout(() => setActiveImage(false), 3000)
    const swiperSlide = swiperSlideRef.current;
    const beginningHeightCard = +beginningHeightCardRef.current.slice(-beginningHeightCardRef.current, -2);
    const paddingString = (getComputedStyle(swiperSlide).paddingLeft);
    const padding = +paddingString.slice(-paddingString.length, -2);
    const slideWidthString = (swiperSlide.style.width);
    const slideWidth = +slideWidthString.slice(-slideWidthString.length, -2);
    const cardWidth = slideWidth - 2 * padding;

    if (!isTablet) {
      gsap.to(`.gallery__description-button.${classActive}`, {
        duration: 0,
        display: 'none',
        delay: 1,
      })
    }

    cardTl.current.to('.gallery__cancel-image', {
      duration: 0.5,
      opacity: 0,
      y: -40,
    })
      .to('.gallery__cancel-image', {
        duration: 0,
        display: 'none',
      })
      .to(`.gallery__image-container.${classActive}`, {
        duration: 0.5,
        opacity: 0,
      })
      .to(`.gallery__content.${classActive}`, {
        duration: 0.5,
        opacity: 0,
      }, '-=0.25')
      .to(`.gallery__small-image-container.${classActive}`, {
        duration: 0.5,
        opacity: 0,
        y: 50,
      }, '-=0.25')
      .to(`.gallery__description.${classActive}`, {
        duration: 0.75,
        opacity: isTablet ? 0 : null,
        x: isTablet ? 75 : null,
        left: isTablet ? null : '-82.5%',
      }, '-=0.25')
      .to(`.gallery__image.${classActive}`, {
        duration: 0,
        delay: 0.25,
        scale: isLaptop ? 1.2 : 1,
        y: isLaptop ? -20 : 0,
      })
      .to(`.gallery__image-container.${classActive}`, {
        duration: 0,
        height: beginningHeightCard,
        border: 'none',
      })
      .to(`.gallery__card.${classActive}`, {
        duration: 0,
        gridTemplateAreas: '"main-image main-image" "content content" "small-image small-image"',
        gridTemplateColumns: 'auto auto',
        gridTemplateRows: 'auto auto auto',
        padding: 0,
      })
      .to(`.gallery__small-image-container.${classActive}`, {
        duration: 0,
        display: 'none',
      })
      .to(`.gallery__description.${classActive}`, {
        duration: 0,
        display: 'none',
      }, '-=0.25')
      .to(`.gallery__additional.${classActive}`, {
        duration: 0,
        display: 'flex',
      })
      .to(`.gallery__card.${classActive}`, {
        duration: 1,
        width: cardWidth,
        height: 'auto',
        left: 'auto',
        ease: 'power3.inOut',
      })
      .to(`.gallery__card.${classActive}`, {
        duration: 0,
        position: 'relative',
        width: 'auto',
        cursor: 'pointer',
        zIndex: 'auto',
      })
      .to(`.gallery__image-container.${classActive}`, {
        duration: 0.5,
        opacity: 1,
      })
      .to(`.gallery__content.${classActive}`, {
        paddingLeft: '20px',
        duration: 0.5,
        opacity: 1,
      }, '-=0.25')
  }

  const handleHover = (e) => {
    if (activeImage) return
    const id = e.target.dataset.id;
    document.querySelector(`.gallery__image.${id}`).style.transform = `translate3d(0,0,0) scale(1)`;
  }
  const handleHoverExit = (e) => {
    if (activeImage) return;
    const id = e.target.dataset.id;
    if (e.target.className === `gallery__button ${id}`) return
    document.querySelector(`.gallery__image.${id}`).style.transform = `translate3d(0,-20px,0) scale(1.2)`;
  }

  const handleDescription = (e) => {
    const classActive = e.target.dataset.id;
    const position = document.querySelector(`.gallery__description.${classActive}`).getBoundingClientRect();
    switch (position.x) {
      case 0:
        gsap.to(`.gallery__description.${classActive}`, {
          duration: 0.75,
          left: '-82.5%',
        })
        break;
      case -position.width:
        gsap.to(`.gallery__description.${classActive}`, {
          duration: 0.75,
          left: 0,
        })
        break;
      default: return;
    }
  }

  return (
    <section className="gallery">
      <h1 className="gallery__header">gallery of the most important events</h1>
      <main className="gallery__main">
        <button className="gallery__cancel-image" data-id={classToDecrease} onClick={decreaseImage}>X</button>
        <div className={activeImage ? "gallery__swiper-container swiper-container swiper-no-swiping" : "gallery__swiper-container swiper-container"}>
          <div className="gallery__swiper-wrapper swiper-wrapper" ref={el => swiperWrapper = el}>
            {cardsData.map(card => (
              <div className="gallery__swiper-slide swiper-slide" key={card.classId}>
                <div className={`gallery__card ${card.classId}`}>
                  <div className={`gallery__image-container ${card.classId}`}
                    onMouseEnter={isLaptop ? handleHover : undefined}
                    onMouseOut={isLaptop ? handleHoverExit : undefined}>
                    <img src={card.mainImage} alt={card.classId} className={`gallery__image ${card.classId}`} />
                    <div className={`gallery__additional ${card.classId}`} data-id={card.classId}>
                      <button className={`gallery__button ${card.classId}`} data-id={card.classId} onClick={increaseImage}
                        onMouseEnter={isLaptop ? handleHover : undefined}
                        onMouseOut={isLaptop ? handleHoverExit : undefined}>more info</button>
                    </div>
                  </div>
                  <div className={`gallery__content ${card.classId}`}>
                    <p className="gallery__title">{card.title}</p>
                    <p className="gallery__date">{card.date}</p>
                    {!isTablet && <button className={`gallery__description-button fas fa-file-alt ${card.classId}`}
                      onClick={!isTablet ? handleDescription : undefined} data-id={card.classId}></button>}
                  </div>
                  <div className={`gallery__small-image-container ${card.classId}`}>
                    <div className="gallery__small-image-element">
                      <img src={card.smallImageFirst} alt={card.classId} className="gallery__small-image" />
                    </div>
                    <div className="gallery__small-image-element">
                      <img src={card.smallImageSecond} alt={card.classId} className="gallery__small-image" />
                    </div>
                  </div>
                  <div className={`gallery__description ${card.classId}`}>
                    <div className="gallery__description-text-container" data-simplebar>
                      {card.text.map((paragraph, i) => (
                        <p className="gallery__description-text" key={i}>
                          <span className="gallery__description-span">{paragraph}</span>
                          {i === card.text.length - 1 ? null : <br />}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </main>
    </section >
  );
}

export default Gallery;