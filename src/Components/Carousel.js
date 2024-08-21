import React from 'react'
import image1 from '../images/img1.jpg'
import image2 from '../images/img2.jpg'
import image3 from '../images/img3.jpg'
import './carousel.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {

  const settings={
    // dots:true,
    infinite: true,
    speed:500,
    slidesToShow:1,
    slidesToScroll:1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className='slider-container'> 
      <Slider {...settings}>
      <div>
        <img src={image1} alt="First slide"/>
      </div>
      <div>
       <img src={image2} alt="slide"/>
      </div>
      <div>
       <img src={image3} alt="slide"/>
      </div>

      </Slider>
      


    </div>
    
  )
}

export default Carousel
