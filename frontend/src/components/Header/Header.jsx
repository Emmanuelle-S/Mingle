import React, { useState, useEffect } from 'react';
import { FaUser, FaBars } from 'react-icons/fa';
import logo from "../../assets/SVG/logo1.svg"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by verifying the presence of a token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="p-4 relative bg-transparent z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="md:hidden">
          <FaBars className="text-white mr-2 text-lg sm:text-base" onClick={toggleMenu} />
        </div>

        <div className="text-white text-xl font-bold flex-none md:mr-auto">
          <a href="/">
            <img src={logo} alt="Mingle Logo" className="h-10 w-auto" />
          </a>
        </div>

        <div className="md:hidden relative">
          <FaUser className="text-white ml-2 cursor-pointer text-lg sm:text-base" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-lg shadow-lg py-2">
              {isLoggedIn ? (
                <>
                  <a href="/profil" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Profil</a>
                  <a href="/EditProfil" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Modifier</a>
                  <a href="/manage-services" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Gérer mes services</a>
                  <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Déconnexion</a>
                </>
              ) : (
                <a href="/ConnexionInscription" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Connexion/Inscription</a>
              )}
            </div>
          )}
        </div>

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
                {isLoggedIn ? (
                  <>
                    <a href="/profil" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Profil</a>
                    <a href="/EditProfil" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Modifier</a>
                    <a href="/manage-services" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Gérer mes services</a>
                    <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Déconnexion</a>
                  </>
                ) : (
                  <a href="/ConnexionInscription" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Connexion/Inscription</a>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>

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
