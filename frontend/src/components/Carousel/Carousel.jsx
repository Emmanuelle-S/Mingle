// src/components/Carousel.jsx
import React, { useState, useEffect } from 'react';

const slides = [
  { id: 1, url: 'https://via.placeholder.com/600x300?text=Slide+1' },
  { id: 2, url: 'https://via.placeholder.com/600x300?text=Slide+2' },
  { id: 3, url: 'https://via.placeholder.com/600x300?text=Slide+3' },
  { id: 4, url: 'https://via.placeholder.com/600x300?text=Slide+4' },
  { id: 5, url: 'https://via.placeholder.com/600x300?text=Slide+5' },
];

const CarouselDefault = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1566) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 800) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-5xl md:max-w-[85%] mx-auto overflow-hidden">
      <div
        className="flex transition-transform ease-in-out duration-500"
        style={{ transform: `translateX(-${(currentSlide * 100) / slidesToShow}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full"
            style={{ flex: `0 0 ${100 / slidesToShow}%` }}
          >
            <img src={slide.url} alt={`Slide ${slide.id}`} className="w-full p-4" />
          </div>
        ))}
      </div>
      <button
        onClick={() => prevSlide()}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={() => nextSlide()}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &gt;
      </button>
      <div className="flex justify-center mt-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselDefault;
