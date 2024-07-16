// src/components/Carousel.jsx
import React, { useState, useEffect } from 'react';

const CarouselDefault = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);

  // Handle window resize to set the number of slides to show
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

  // Automatic slide change logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [currentSlide, slidesToShow]);

  // Go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const nextIndex = prev + slidesToShow;
      if (nextIndex >= slides.length) {
        return 0; // Loop back to the start
      }
      return nextIndex;
    });
  };

  // Go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const prevIndex = prev - slidesToShow;
      if (prevIndex < 0) {
        return Math.max(0, slides.length - slidesToShow); // Loop to the end
      }
      return prevIndex;
    });
  };

  return (
    <div className="relative w-full max-w-5xl md:max-w-[100%] mx-auto overflow-hidden">
      <div
        className="flex transition-transform ease-in-out duration-500"
        style={{ transform: `translateX(-${(currentSlide * 100) / slidesToShow}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full relative"
            style={{ flex: `0 0 ${(100 / slidesToShow)}%` }}
          >
            <img src={slide.url} alt={`Slide ${slide.id}`} className="w-full p-4" />
            <div className="absolute bottom-4 left-4 right-4 cust text-right custom-bg text-white">
              <p className="px-2">En savoir plus</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
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
