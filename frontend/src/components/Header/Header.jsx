import { useState, useRef } from 'react';
import { FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

// Composant Header
const Header = () => {
  // État du menu
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Setter Toggle menu
  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <header className="p-4 bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="logo text-white text-xl font-bold">
          <NavLink to="/">Mingle</NavLink>
        </div>
        
        {/* Navigation de bureau */}
        <nav className="hidden md:flex space-x-4 ml-auto items-center p-3">
          <NavLink to="/" className="text-black hover:text-gray-700">Accueil</NavLink>
          <NavLink to="/about" className="text-black hover:text-gray-700">À propos</NavLink>
          <NavLink to="/services" className="text-black hover:text-gray-700">Services</NavLink>
          <NavLink to="/publier" className="text-black hover:text-gray-700">Publier</NavLink>
          <NavLink to="/formulaire" className="text-white hover:text-gray-700 rounded-full h-10 bg-green-900 flex items-center justify-center px-4">
            Contactez nous
          </NavLink>
          <FaUser className="ml-2 text-white" />
        </nav>

        {/* Bouton du menu burger */}
        <button onClick={toggleMenu} className="md:hidden ml-10 text-white">
          ☰
        </button>
      </div>
      
      {/* Menu mobile */}
      {isOpen && (
        <div ref={menuRef} className="md:hidden flex flex-col space-y-4 mt-4">
          <NavLink to="/" className="text-black hover:text-gray-700" onClick={toggleMenu}>Accueil</NavLink>
          <NavLink to="/about" className="text-black hover:text-gray-700" onClick={toggleMenu}>À propos</NavLink>
          <NavLink to="/services" className="text-black hover:text-gray-700" onClick={toggleMenu}>Services</NavLink>
          <NavLink to="/publier" className="text-black hover:text-gray-700" onClick={toggleMenu}>Publier</NavLink>
          <NavLink to="/formulaire" className="text-white hover:text-gray-700 rounded-full h-10 bg-green-900 flex items-center justify-center px-4" onClick={toggleMenu}>
            Contactez nous
          </NavLink>
          <FaUser className="ml-2 text-white" />
        </div>
      )}
    </header>
  );
};

export default Header;
