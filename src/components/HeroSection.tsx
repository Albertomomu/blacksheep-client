import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeroSlide from "./HeroSlide";

import Slider from "react-slick";
const HeroSection = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div className="heroImage relative">
        <HeroSlide black/>
      </div>
      <div className="heroImage2 relative">
        <HeroSlide black={undefined}/>
      </div>
    </Slider>
  );
}

export default HeroSection;