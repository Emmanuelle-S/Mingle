import React from 'react';
import axios from 'axios';

// Composant DeleteButton pour supprimer une catégorie
const DeleteButton = ({ categoryId, onDelete }) => {
  // Fonction pour gérer la suppression de la catégorie
  const handleDelete = async () => {
    try {
      // Envoyer une requête DELETE pour supprimer la catégorie
      await axios.delete(`http://localhost:5000/categoryservice/${categoryId}`);
      onDelete(categoryId); // Appeler la fonction onDelete avec l'ID de la catégorie supprimée
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error.message || error);
    }
  };

  return (
    <button type="button" className="bg-red-500 text-white p-3 rounded-md w-full" onClick={handleDelete}>
      Supprimer
    </button>
  );
};

export default DeleteButton;
