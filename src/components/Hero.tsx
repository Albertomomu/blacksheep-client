import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeroSlide from "./HeroSlide";

import Slider from "react-slick";
export const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <HeroSlide />
      </div>
      <div>
        <h3>2</h3>
      </div>
    </Slider>
  );
}

