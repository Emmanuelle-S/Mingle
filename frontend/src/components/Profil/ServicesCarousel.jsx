import React from 'react';

const ServicesCarousel = ({ services }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto ">
      {services.map(service => (
        <div key={service.id} className="flex-shrink-0 w-64 p-4 bg-white shadow-md rounded-lg">
          <img src={service.imageUrl} alt={service.title} className="w-full h-32 object-cover mb-2 rounded-lg" />
          <h3 className="text-lg font-semibold text-darkslategray mb-2">{service.title}</h3>
          <p className="text-sm text-gray-600">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServicesCarousel;
