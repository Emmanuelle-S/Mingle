import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = ({ onAdd }) => {
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');
  console.log(newCategoryImage);

  const handleAdd = async () => {
    const newCard = {
      titre_catégorie: newCategoryTitle || 'Nouvelle Catégorie', // Utilise le titre saisi ou une valeur par défaut
      category_image: newCategoryImage || 'https://via.placeholder.com/150' // URL d'image par défaut
    };
    try {
      // Envoyer les données à l'API
      const response = await axios.post('http://localhost:5000/categoryservice', newCard);
      console.log('New card added:', response.data);
      console.log(newCard);

      // Mettre à jour l'état avec l'ID retourné par l'API
      onAdd({ ...newCard, id: response.data.id });

      setNewCategoryTitle(''); // Réinitialiser le titre de la catégorie
      setNewCategoryImage(''); // Réinitialiser l'URL de l'image
    } catch (error) {
      console.error('Error adding new card:', error.message || error);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded w-80">
      <input
        type="text"
        value={newCategoryTitle}
        onChange={(e) => setNewCategoryTitle(e.target.value)}
        placeholder="Titre de la nouvelle catégorie"
        className="border p-2 rounded-md mb-2 w-full"
      />
      <input
        type="text"
        value={newCategoryImage}
        onChange={(e) => setNewCategoryImage(e.target.value)}
        placeholder="URL de l'image"
        className="border p-2 rounded-md mb-2 w-full"
      />
      <button 
        className="bg-green-500 text-white p-2 rounded-md w-full mb-2" 
        onClick={handleAdd}>
        Ajouter
      </button>
     
    </div>
  );
};

export default AddCategory;
