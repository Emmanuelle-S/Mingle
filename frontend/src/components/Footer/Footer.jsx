import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark p-4 relative z-50">
      <div className="container mx-auto flex flex-col items-center text-center">
        <nav className="flex flex-col md:flex-row md:space-x-4 items-center">
          <Link to="/FAQ" className="text-white hover:text-gray-300">FAQ</Link>
          <Link to="/ConditionsUtilisation" className="text-white hover:text-gray-300">Conditions d'utilisation</Link>
          <Link to="/politique" className="text-white hover:text-gray-300">Politique de confidentialité</Link>
          <Link to="/formulaire" className="text-white hover:text-gray-300">Contact</Link>
          <Link to="/about" className="text-white hover:text-gray-300">À propos</Link>
        </nav>
      </div>
      <div className="container mx-auto text-center mt-4">
        <p className="text-white text-sm">
          &copy; 2024 Mingle. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
