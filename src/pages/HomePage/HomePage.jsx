// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './HomePage.module.scss';
import Fablab1 from '~/assets/imgs/fablab1.jpg';
import Fablab2 from '~/assets/imgs/fablab2.jpeg';
import Fablab3 from '~/assets/imgs/fablab3.jpeg';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [Fablab1, Fablab2, Fablab3];

  useEffect(() => {
    const myTimeout = setTimeout(() => {
      setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    }, 3000);
    return () => clearTimeout(myTimeout);
  }, [currentIndex]);
  const gotoPrevious = () => {
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const gotoNext = () => {
    const isLast = currentIndex === slides.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    console.log(currentIndex);
  };

  return (
    <div className={css('container')}>
      <div className={css('slideshow')}>
        <div className={css('leftBtn')} onClick={gotoPrevious}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <img src={slides[currentIndex]} alt="" className={css('activeSlide')} />
        <div className={css('rightBtn')} onClick={gotoNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
