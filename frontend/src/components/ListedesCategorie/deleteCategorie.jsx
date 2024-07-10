import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Composant DeleteButton pour supprimer une catégorie
const DeleteButton = ({ categoryId, onDelete }) => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState({ visible: false, message: '', type: '' });
console.log(categoryId);
  // Fonction pour gérer la suppression de la catégorie
  const handleDelete = async () => {
    try {
      // Envoyer une requête DELETE pour supprimer la catégorie
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/categoryservice/${categoryId}`);
      onDelete(categoryId); // Appeler la fonction onDelete avec l'ID de la catégorie supprimée
      setPopup({ visible: true, message: 'Catégorie supprimée avec succès !', type: 'success' });

      setTimeout(() => {
        setPopup({ visible: false, message: '', type: '' });
        navigate('/listeService'); // Redirection vers la page de la liste des cartes
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error.message || error);
      setPopup({ visible: true, message: 'Erreur lors de la suppression de la catégorie : ' + (error.message || error), type: 'error' });

      setTimeout(() => {
        setPopup({ visible: false, message: '', type: '' });
      }, 3000);
    }
  };

  return (
    <div className="relative">
      <button type="button" className="bg-red-500 text-white p-3 rounded-md w-full" onClick={handleDelete}>
        Supprimer
      </button>
      {popup.visible && (
        <div className={`fixed bottom-4 left-4 p-4 rounded-md text-white ${popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {popup.message}
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
