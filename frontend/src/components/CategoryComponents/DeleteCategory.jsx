import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Composant DeleteButton pour supprimer une catégorie
const DeleteCategory = ({ categoryId, onDelete }) => {
  // Hook de navigation de React Router pour rediriger l'utilisateur
  const navigate = useNavigate();
  
  // État pour gérer l'affichage des messages contextuels (popup)
  const [popup, setPopup] = useState({ visible: false, message: '', type: '' });
  
  // Afficher l'ID de la catégorie à supprimer pour le débogage
  console.log(categoryId);

  // Fonction pour gérer la suppression de la catégorie
  const handleDelete = async () => {
    try {
      // Envoyer une requête DELETE pour supprimer la catégorie
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/categoryservice/${categoryId}`);
      
      // Appeler la fonction onDelete avec l'ID de la catégorie supprimée
      onDelete(categoryId);
      
      // Afficher un message de succès dans le popup
      setPopup({ visible: true, message: 'Catégorie supprimée avec succès !', type: 'success' });

      // Masquer le popup après 3 secondes et rediriger l'utilisateur
      setTimeout(() => {
        navigate('/listeCategories'); // Redirection vers la page de la liste des cartes
        setPopup({ visible: false, message: '', type: '' });
      }, 20);
    } catch (error) {
      // Afficher un message d'erreur dans le popup en cas d'échec de la suppression
      console.error('Erreur lors de la suppression de la catégorie:', error.message || error);
      setPopup({ visible: true, message: 'Erreur lors de la suppression de la catégorie : ' + (error.message || error), type: 'error' });

      // Masquer le popup après 3 secondes
      setTimeout(() => {
        setPopup({ visible: false, message: '', type: '' });
      }, 2000);
    }
  };

  return (
    <div className="relative">
      {/* Bouton pour déclencher la suppression de la catégorie */}
      <button type="button" className="bg-red-500 text-white p-3 rounded-md w-full" onClick={handleDelete}>
        Supprimer
      </button>
      {/* Affichage du popup en bas à gauche de l'écran */}
      {popup.visible && (
        <div className={`fixed bottom-4 left-4 p-4 rounded-md text-white ${popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {popup.message}
        </div>
      )}
    </div>
  );
};

export default DeleteCategory;
