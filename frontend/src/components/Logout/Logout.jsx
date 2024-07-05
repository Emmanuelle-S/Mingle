import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LogoutPopup from "./LogoutPopup";
import { AuthContext } from '../../contexts/AuthContext';

const Logout = ({ closeMenu }) => { 
  const [showPopup, setShowPopup] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowPopup(true);
  };

  const closePopupAndNavigate = () => {
    logout(); // Déconnecter l'utilisateur via le contexte AuthContext
    setShowPopup(false);
    navigate("/");
    closeMenu(); // Fermer le menu après la déconnexion
  };

  return (
    <>
      <button
        className="block px-4 py-2 text-gray-800 hover:bg-yellow-400"
        onClick={handleClick}
      >
        Déconnexion
      </button>
      {showPopup && <LogoutPopup onClose={closePopupAndNavigate} />}
    </>
  );
};

export default Logout;
