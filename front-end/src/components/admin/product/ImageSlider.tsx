import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { iImages } from '../../../interface/product';
interface iProps {
    images: iImages[]
}
const SliderComponent = ({images}: iProps) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  };

  return (
    <Slider {...settings}>
        {images.map((item, index) => <div key={index}><img src={item.url} className="card-img-top"/></div>)}
    </Slider>
  );
};

export default SliderComponent;
