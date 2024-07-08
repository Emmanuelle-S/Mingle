import React, { useContext, useState, useEffect } from "react";
import { FaUser, FaBars } from "react-icons/fa";
import logo from "../../assets/SVG/logo1.svg";
import { Link } from "react-router-dom";
import Logout from "@components/Logout/Logout";
import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Déclaration d'un état pour gérer l'ouverture/fermeture du menu principal
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // Déclaration d'un état pour gérer l'ouverture/fermeture du menu utilisateur
  const { isLoggedIn, userId } = useContext(AuthContext);
  // Utilisation de userId depuis le contexte -> Extraction des valeurs isLoggedIn et userId du contexte d'authentification

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // Fonction pour basculer l'état d'ouverture/fermeture du menu principal

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  // Fonction pour basculer l'état d'ouverture/fermeture du menu utilisateur

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  // Fonction pour fermer le menu principal

  useEffect(() => {
    // Utilisation du hook useEffect pour surveiller les changements de isLoggedIn
    console.log("isLoggedIn changed:", isLoggedIn);
    // Log pour voir quand isLoggedIn change
  }, [isLoggedIn]);
  // Dépendance sur isLoggedIn

  const handleLinkClick = () => {
    // Fonction pour gérer les clics sur les liens du menu
    closeMenu();
    // Ferme le menu principal
    setIsUserMenuOpen(false);
    // Ferme le menu utilisateur
  };

  return (
    <header className="p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="md:hidden">
          <FaBars
            className="text-white mr-2 text-lg sm:text-base"
            onClick={toggleMenu}
          />
        </div>
        <div className="text-white text-xl font-bold flex-none md:mr-auto">
          <Link to="/">
            <img src={logo} alt="Mingle Logo" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="md:hidden relative">
          <FaUser
            className="text-white ml-2 cursor-pointer text-lg sm:text-base"
            onClick={toggleUserMenu}
          />
          {isUserMenuOpen && (
            /* Affichage conditionnel du menu principal */
            <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-lg shadow-lg py-2">
              {isLoggedIn ? (
                <>
                  <Link
                    to={`/profil/${userId}`}
                    className="block px-4 py-2 text-gray-800 hover:bg-yellow-400"
                    onClick={handleLinkClick}
                  >
                    Profil
                  </Link>
                  <Link
                    to="/manage-services"
                    className="block px-4 py-2 text-gray-800 hover:bg-yellow-400"
                    onClick={handleLinkClick}
                  >
                    Gérer mes services
                  </Link>
                  <Logout closeMenu={closeMenu} />
                </>
              ) : (
                <Link
                  to="/ConnexionInscription"
                  className="block px-4 py-2 text-gray-800 hover:bg-yellow-400"
                  onClick={handleLinkClick}
                >
                  Connexion/Inscription
                </Link>
              )}
            </div>
          )}
        </div>
        <nav className="hidden md:flex md:ml-auto md:space-x-4 items-center relative">
          <Link to="/" className="text-black hover:text-gray-700">
            Accueil
          </Link>
          <Link to="/listeService" className="text-black hover:text-gray-700">
            Catégories de services
          </Link>
          <Link
            to="/publier"
            className="text-white hover:text-gray-700 rounded-full h-10 bg-green-900 flex items-center justify-center px-3"
          >
            Publier un Service
          </Link>
          <div className="relative">
            <FaUser
              className="text-white ml-2 cursor-pointer"
              onClick={toggleUserMenu}
            />
            {isUserMenuOpen && (
              <div className="absolute right-0 w-48 bg-secondary rounded-lg shadow-lg py-2 mt-6">
                {isLoggedIn ? (
                  <>
                    <Link
                      to={`/profil/${userId}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-yellow-400"
                      onClick={handleLinkClick}
                    >
                      Profil
                    </Link>

                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-yellow-400"
                      onClick={handleLinkClick}
                    >
                      Gérer mes services
                    </Link>
                    <Logout closeMenu={closeMenu} />
                  </>
                ) : (
                  <Link
                    to="/ConnexionInscription"
                    className="block px-4 py-2 text-gray-800 hover:bg-yellow-400"
                    onClick={handleLinkClick}
                  >
                    Connexion/Inscription
                  </Link>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start pl-4 mt-2 space-y-2">
          <Link
            to="/"
            className="text-black hover:text-gray-700"
            onClick={handleLinkClick}
          >
            Accueil
          </Link>
          <Link
            to="/service"
            className="text-black hover:text-gray-700"
            onClick={handleLinkClick}
          >
            Services
          </Link>
          <Link
            to="/publier"
            className="text-black hover:text-gray-700"
            onClick={handleLinkClick}
          >
            Publier
          </Link>
          <Link
            to="/formulaire"
            className="text-white hover:text-gray-700 rounded-full h-10 bg-green-900 flex items-center justify-center px-4"
            onClick={handleLinkClick}
          >
            Contactez nous
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
