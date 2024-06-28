// But de ce composant : afficher un message de déconnexion à l'utilisateur + bouton pour fermer le popup. 
// Style = fichier CSS importé.

import React from 'react';
import './LogoutPopup.css'; 

const LogoutPopup = ({ onClose }) => {
  //  Définit une fonction fléchée LogoutPopup qui accepte onClose (qu'on retrouve dans Lougout.jsx) comme prop => sera appelée pour fermer le popup.
  return (
    <div className="logout-popup">
      <div className="logout-popup-content">
        <h2>Vous êtes déconnecté</h2>
        <p>Merci de votre visite. À bientôt !</p>
        <button onClick={onClose}>Fermer</button>
        {/* Bouton d'événement onClick qui appelle la fonction onClose lorsqu'il est cliqué. La fonction onClose est passée comme prop au composant LogoutPopup et est utilisée pour fermer le popup. */}
      </div>
    </div>
  );
};

export default LogoutPopup;
