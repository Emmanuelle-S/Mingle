import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaUser } from 'react-icons/fa'; // Assurez-vous d'importer FaUser
import { MdEmail } from 'react-icons/md';

const Header = () => {
  return (
    <header className="header-gradient p-4 bg-[#DD8F16]">
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
            <FaUser className="ml-2 text-white" />
          </a>
        </nav>

        {/* Icons de réseaux sociaux */}
        <div className="flex space-x-4 text-white ml-4">
          <a href="https://www.linkedin.com" aria-label="LinkedIn" className="block">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="block">
            <FaTwitter />
          </a>
          <a href="https://github.com" aria-label="GitHub" className="block">
            <FaGithub />
          </a>
          <a href="mailto:contact@example.com" aria-label="Email" className="block">
            <MdEmail />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
