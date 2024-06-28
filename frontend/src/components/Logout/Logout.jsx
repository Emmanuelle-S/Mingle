// But de ce composant : gérer la déconnexion de l'utilisateur en supprimant les données userId et token du localStorage et en affichant un popup de confirmation avant de rediriger l'utilisateur vers la page d'accueil.

import React, {useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LogoutPopup from "./LogoutPopup";
import { AuthContext } from '../../contexts/AuthContext';

const Logout = () => {
  // Composant Logout (= fonction fléchée)
  const [showPopup, setShowPopup] = useState(false);
  // État local pour gérer l'affichage du popup de déconnexion : Initialise un état local showPopup à false pour contrôler l'affichage du popup de déconnexion

  const navigate = useNavigate();
  // Hook useNavigate pour gérer la navigation dans l'application : Initialise le hook useNavigate pour pouvoir naviguer dans l'application.

  const { logout } = useContext(AuthContext); // Utilisez le contexte pour accéder à la fonction de déconnexion

  const handleClick = () => {
    // Fonction handleClick pour gérer le clic sur le bouton de déconnexion
    logout(); // Utilise la fonction logout du contexte pour déconnecter l'utilisateur
    setShowPopup(true);
    // Affiche le popup de déconnexion en mettant showPopup à true
  };

  const closePopupAndNavigate = () => {
    // Fonction closePopupAndNavigate pour fermer le popup de déconnexion et naviguer vers '/' = accueil
    setShowPopup(false);
    // Cache le popup de déconnexion en mettant à jour l'état de showPopup à false
    navigate("/");
    // Utilise navigate pour rediriger l'utilisateur vers la page d'accueil.
  };

  // Rendu du composant Logout
  return (
    <>
      {/* Bouton de déconnexion */}
      <button
        className="block px-4 py-2 text-gray-800 hover:bg-yellow-400"
        onClick={handleClick}
      >
        Déconnexion
      </button>
      {showPopup && <LogoutPopup onClose={closePopupAndNavigate} />}
      {/* Utilisation de {showPopup && <LogoutPopup onClose={closePopupAndNavigate} />} pour conditionner l'affichage du composant LogoutPopup lorsque showPopup est true */}
    </>
  );
};

export default Logout;
