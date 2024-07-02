import React, { useContext, useState, useEffect } from 'react';
import { FaUser, FaBars } from 'react-icons/fa';
import logo from "../../assets/SVG/logo1.svg";
import { Link } from 'react-router-dom'; 
import Logout from '@components/Logout/Logout';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    console.log('isLoggedIn changed:', isLoggedIn);
  }, [isLoggedIn]);

  const handleLinkClick = () => {
    closeMenu();
    setIsUserMenuOpen(false); // Ferme également le menu utilisateur si ouvert
  };

  return (
    <header className="p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="md:hidden">
          <FaBars className="text-white mr-2 text-lg sm:text-base" onClick={toggleMenu} />
        </div>
        <div className="text-white text-xl font-bold flex-none md:mr-auto">
          <Link to="/">
            <img src={logo} alt="Mingle Logo" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="md:hidden relative">
          <FaUser className="text-white ml-2 cursor-pointer text-lg sm:text-base" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-lg shadow-lg py-2">
              {isLoggedIn ? (
                <>
                  <Link to="/profil" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400" onClick={handleLinkClick}>Profil</Link>
                  <Link to="/EditProfil" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400" onClick={handleLinkClick}>Modifier</Link>
                  <Link to="/manage-services" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400" onClick={handleLinkClick}>Gérer mes services</Link>
                  <Logout closeMenu={closeMenu} /> {/* Passez closeMenu comme prop */}
                </>
              ) : (
                <Link to="/ConnexionInscription" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400" onClick={handleLinkClick}>Connexion/Inscription</Link>
              )}
            </div>
          )}
        </div>
        <nav className="hidden md:flex md:ml-auto md:space-x-4 items-center relative">
          <Link to="/" className="text-black hover:text-gray-700">Accueil</Link>
          <Link to="/about" className="text-black hover:text-gray-700">À propos</Link>
          <Link to="/services" className="text-black hover:text-gray-700">Services</Link>
          <Link to="/publier" className="text-black hover:text-gray-700">Publier</Link>
          <Link to="/formulaire" className="text-white hover:text-gray-700 rounded-full h-10 bg-green-900 flex items-center justify-center px-3">
            Contactez nous
          </Link>
          <div className="relative">
            <FaUser className="text-white ml-2 cursor-pointer" onClick={toggleUserMenu} />
            {isUserMenuOpen && (
              <div className="absolute right-0 w-48 bg-secondary rounded-lg shadow-lg py-2 mt-6">
                {isLoggedIn ? (
                  <>
                    <Link to="/profil" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400" onClick={handleLinkClick}>Profil</Link>
                    <Link to="/EditProfil" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400" onClick={handleLinkClick}>Modifier</Link>
                    <Link to="/manage-services" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400" onClick={handleLinkClick}>Gérer mes services</Link>
                    <Logout closeMenu={closeMenu} /> {/* Passez closeMenu comme prop */}
                  </>
                ) : (
                  <Link to="/ConnexionInscription" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400" onClick={handleLinkClick}>Connexion/Inscription</Link>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start pl-4 mt-2 space-y-2">
          <Link to="/" className="text-black hover:text-gray-700" onClick={handleLinkClick}>Accueil</Link>
          <Link to="/about" className="text-black hover:text-gray-700" onClick={handleLinkClick}>À propos</Link>
          <Link to="/services" className="text-black hover:text-gray-700" onClick={handleLinkClick}>Services</Link>
          <Link to="/publier" className="text-black hover:text-gray-700" onClick={handleLinkClick}>Publier</Link>
          <Link to="/formulaire" className="text-white hover:text-gray-700 rounded-full h-10 bg-green-900 flex items-center justify-center px-4" onClick={handleLinkClick}>
            Contactez nous
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
