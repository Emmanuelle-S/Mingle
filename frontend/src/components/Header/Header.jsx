//  But du composant : une navigation l'application, avec des fonctionnalités adaptées aux utilisateurs connectés et non connectés, et une compatibilité avec différents appareils et tailles d'écran.

import React, { useContext, useState } from 'react';
import { FaUser, FaBars } from 'react-icons/fa';
import logo from "../../assets/SVG/logo1.svg";
import { Link } from 'react-router-dom'; // Importez useNavigate et Link depuis React Router
import Logout from '@components/Logout/Logout';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
  // Déclare une fonction fléchée qui définit le composant Header.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Déclare l'état isMenuOpen pour gérer l'ouverture du menu.
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  //  Déclare l'état isUserMenuOpen pour gérer l'ouverture du menu utilisateur.
  const { isLoggedIn } = useContext(AuthContext); 
  // Utilise le contexte pour obtenir l'état de connexion

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // Déclare une fonction pour ouvrir/fermer le menu principal.

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  // Déclare une fonction pour ouvrir/fermer le menu utilisateur.

  return (
    <header className="p-4 relative bg-transparent z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="md:hidden">
        {/* Conteneur visible uniquement sur mobile. */}
          <FaBars className="text-white mr-2 text-lg sm:text-base" onClick={toggleMenu} />
        </div>

        <div className="text-white text-xl font-bold flex-none md:mr-auto">
          <Link to="/">
            <img src={logo} alt="Mingle Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="md:hidden relative">
        {/* Conteneur du menu utilisateur, visible uniquement sur mobile. */}
          <FaUser className="text-white ml-2 cursor-pointer text-lg sm:text-base" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-lg shadow-lg py-2">
              {/* Affiche le menu utilisateur si isUserMenuOpen est vrai. */}
              {isLoggedIn ? (
                // Affiche les options de menu en fonction de l'état de connexion de l'utilisateur.
                <>
                  <Link to="/profil" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Profil</Link>
                  <Link to="/EditProfil" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Modifier</Link>
                  <Link to="/manage-services" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Gérer mes services</Link>
                  <Logout /> {/* Utilisation du composant Logout pour gérer la déconnexion */}
                </>
              ) : (
                <Link to="/ConnexionInscription" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Connexion/Inscription</Link>
              )}
            </div>
          )}
        </div>

        <nav className="hidden md:flex md:ml-auto md:space-x-4 items-center relative">
        {/* Conteneur du menu de navigation principal, caché sur mobile. */}
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
                    <Link to="/profil" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Profil</Link>
                    <Link to="/EditProfil" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Modifier</Link>
                    <Link to="/manage-services" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Gérer mes services</Link>
                    <Logout /> {/* Utilisation du composant Logout pour gérer la déconnexion */}
                  </>
                ) : (
                  <Link to="/ConnexionInscription" className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">Connexion/Inscription</Link>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start pl-4 mt-2 space-y-2">
          <Link to="/" className="text-black hover:text-gray-700">Accueil</Link>
          <Link to="/about" className="text-black hover:text-gray-700">À propos</Link>
          <Link to="/services" className="text-black hover:text-gray-700">Services</Link>
          <Link to="/publier" className="text-black hover:text-gray-700">Publier</Link>
          <Link to="/formulaire" className="text-white hover:text-gray-700 rounded-full h-10 bg-green-900 flex items-center justify-center px-4">
            Contactez nous
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
