import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = ({ images }) => (
  <Carousel>
    {images?.map((image, idx) => (
      <div key={idx}>
        <img src={image.src} alt={image.alt} height={"600px"} width={"500px"} />
      </div>
    ))}
  </Carousel>
);

export default ImageCarousel;
