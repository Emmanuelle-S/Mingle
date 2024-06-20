import React from 'react';
import { FaUser } from 'react-icons/fa'
const Header = () => {
  return (
    <header className=" p-4 bg-transparent ">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          <a href="/">Mingle</a>
        </div>
        
        {/* Navigation */}
        <nav className="flex space-x-4 ml-auto items-center">
          <a href="/" className="text-black hover:text-gray-700">Accueil</a>
          <a href="/about" className="text-black hover:text-gray-700">À propos</a>
          <a href="/services" className="text-black hover:text-gray-700">Services</a>
          <a href="/publier" className="text-black hover:text-gray-700">Publier</a>
          <a href="/contact" className="text-white hover:text-gray-700 rounded-full h-10 bg-green-900 flex items-center justify-center px-4">
            Contactez nous
          </a>
            <FaUser className="ml-2 text-white" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
