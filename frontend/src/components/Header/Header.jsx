import React, { useState } from 'react';
import { FaUser, FaBars } from 'react-icons/fa';

const Header = () => {
  // État pour gérer l'ouverture du menu principal
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // État pour gérer l'ouverture du menu utilisateur
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Fonction pour basculer l'état du menu principal
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction pour basculer l'état du menu utilisateur
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="p-4 relative bg-transparent z-50">
      <div className="container mx-auto flex justify-between items-center">

        {/* Icône du menu burger pour mobile */}
        <div className="md:hidden">
          <FaBars className="text-white mr-2 text-lg sm:text-base" onClick={toggleMenu} />
        </div>

        {/* Logo pour mobile (centré) et bureau (gauche) */}
        <div className="text-white text-xl font-bold flex-none md:mr-auto">
          <a href="/">Mingle</a>
        </div>

        {/* Icône utilisateur pour mobile */}
        <div className="md:hidden relative">
          <FaUser className="text-white ml-2 cursor-pointer text-lg sm:text-base" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-lg shadow-lg py-2">
              <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Profil</a>
              <a href="/modify" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Modifier</a>
              <a href="/manage-services" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Gérer mes services</a>
              <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Déconnexion</a>
            </div>
          )}
        </div>

        {/* Navigation pour bureau */}
        <nav className="hidden md:flex md:ml-auto md:space-x-4 items-center relative">
          <a href="/" className="text-black hover:text-gray-700">Accueil</a>
          <a href="/about" className="text-black hover:text-gray-700">À propos</a>
          <a href="/services" className="text-black hover:text-gray-700">Services</a>
          <a href="/publier" className="text-black hover:text-gray-700">Publier</a>
          <a href="/formulaire" className="text-white hover:text-gray-700 rounded-full h-10 bg-green-900 flex items-center justify-center px-3">
            Contactez nous
          </a>
          <div className="relative">
            <FaUser className="text-white ml-2 cursor-pointer" onClick={toggleUserMenu} />
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-lg shadow-lg py-2 mt-6">
                <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Profil</a>
                <a href="/modify" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Modifier</a>
                <a href="/manage-services" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Gérer mes services</a>
                <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Déconnexion</a>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Menu mobile affiché lorsque isMenuOpen est vrai */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start pl-4 mt-2 space-y-2">
          <a href="/" className="text-black hover:text-gray-700">Accueil</a>
          <a href="/about" className="text-black hover:text-gray-700">À propos</a>
          <a href="/services" className="text-black hover:text-gray-700">Services</a>
          <a href="/publier" className="text-black hover:text-gray-700">Publier</a>
          <a href="/formulaire" className="text-white hover:text-gray-700 rounded-full h-10 bg-green-900 flex items-center justify-center px-4">
            Contactez nous
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
