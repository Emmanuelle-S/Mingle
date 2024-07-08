import React, { useState } from 'react';
import axios from 'axios';
import DeleteButton from './deleteCategorie'; // Importer le composant DeleteButton

// Composant EditCategory pour éditer une catégorie
const EditCategory = ({ category, onSave, onDelete }) => {
  // États locaux pour le titre et la description de la catégorie
  const [title, setTitle] = useState(category.titre_catégorie);
  const [description, setDescription] = useState(category.category_description);

  // Fonction pour gérer la sauvegarde des modifications
  const handleSave = async (event) => {
    event.preventDefault(); // Empêcher la soumission par défaut du formulaire

    // Créer un objet avec les nouvelles valeurs de la catégorie
    const updatedCategory = {
      ...category,
      titre_catégorie: title,
      category_description: description,
    };

    try {
      // Envoyer une requête PUT pour mettre à jour la catégorie
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/categoryservice/${category.id}`, updatedCategory);
      onSave(updatedCategory); // Appeler la fonction onSave avec les nouvelles valeurs de la catégorie
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error.message || error);
    }
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col bg-white shadow-md rounded-lg p-6 m-4 w-full max-w-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Modifier la catégorie</h2>
      <div className="mb-4 text-center">
        <h3 className="text-lg font-bold mb-2">{category.titre_catégorie}</h3>
        {category.category_image ? (
          <img src={category.category_image} alt={category.titre_catégorie} className="w-full h-32 object-cover rounded-lg mb-4" />
        ) : (
          <p className="text-gray-600 mb-4">Aucune image</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="title">
          Titre de la catégorie
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entrez le titre de la catégorie"
          className="border p-3 rounded-md w-full text-center"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="description">
          Description de la catégorie
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Entrez la description de la catégorie"
          className="border p-3 rounded-md w-full text-center"
          rows="4"
        ></textarea>
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-md w-full">
          Enregistrer les modifications
        </button>
        <DeleteButton categoryId={category.id} onDelete={onDelete} />
      </div>
    </form>
  );
};

export default EditCategory;
