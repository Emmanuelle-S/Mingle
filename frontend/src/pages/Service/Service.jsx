import React, { useState, useEffect } from 'react';
import mechanic from '../../assets/mechanic.jpg';
import mechanic_a from '../../assets/mechanic_a.webp';
import mechanic_b from '../../assets/mechanic_b.webp';
import mechanic_c from '../../assets/mechanic_c.webp';
import menage from '../../assets/menage.png';
import menage_a from '../../assets/menage_a.webp';
import menage_b from '../../assets/menage_b.webp';
import menage_c from '../../assets/menage_c.webp';
import old from '../../assets/old.webp';
import old_a from '../../assets/old_a.webp';
import old_b from '../../assets/old_b.webp';
import old_c from '../../assets/old_c.webp';
import phone from '../../assets/phone.png';
import phone_a from '../../assets/phone_a.webp';
import phone_b from '../../assets/phone_b.webp';
import phone_c from '../../assets/phone_c.webp';
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import '../../../src/index.css';

const servicesData = [
  { title: "Service Ménage", description: "Description brève", images: [menage, menage_a, menage_b, menage_c] },
  { title: "Service Personnes Âgées", description: "Description brève", images: [old, old_a, old_b, old_c] },
  { title: "Service Téléphonique", description: "Description brève", images: [phone, phone_a, phone_b, phone_c] },
  { title: "Service de réparation", description: "Description brève", images: [mechanic, mechanic_a, mechanic_b, mechanic_c] }
];

const ServiceCard = ({ title, description, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 800); // Change image every 0.8 second
    } else {
      setCurrentImageIndex(0); // Reset to first image when not hovered
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <div className="bg-yellow-600 p-4 m-4 w-full md:w-80 h-auto flex flex-col justify-between">
      <div
        className="flex-grow flex items-center justify-center mb-2 p-2 bg-white h-40 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="max-w-full max-h-full object-contain transition-transform duration-500 ease-in-out transform hover:scale-110 hover:rotate-2"
        />
      </div>
      <h3 className="text-xl font-bold mt-2">{title}</h3>
      <p className="text-sm">{description}</p>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4">View Detail</button>
    </div>
  );
};

const Service = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex justify-center p-4 md:p-14 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} title={service.title} description={service.description} images={service.images} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
