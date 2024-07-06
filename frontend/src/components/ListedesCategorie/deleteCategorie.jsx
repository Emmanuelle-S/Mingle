import React from 'react';
import axios from 'axios';

const DeleteButton = ({ categoryId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/categoryservice/${categoryId}`);
      onDelete(categoryId);
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
