import React, { useEffect } from 'react';
import axios from 'axios';

const DeleteButton = ({ user, selectedConversation, fetchMingle, setSelectedConversation }) => {
  console.log('selectedConversation:', selectedConversation);

  const handleDelete = async () => {
    if (!selectedConversation) {
      console.error("No conversation selected");
      return;
    }

    try {
      // Appel à l'API pour supprimer la conversation
      await axios.delete(`http://localhost:5000/conversation/${selectedConversation.id}`);

      // Rafraîchir la liste des conversations après la suppression
      fetchMingle(user.id); // Si vous avez une fonction pour rafraîchir les données
      setSelectedConversation(null); // Réinitialiser la conversation sélectionnée
    } catch (error) {
      console.error("Erreur lors de la suppression de la conversation:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
    >
      Supprimer la conversation
    </button>
  );
};

export default DeleteButton;
