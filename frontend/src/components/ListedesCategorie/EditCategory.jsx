import React, { useState } from 'react';
import axios from 'axios';

const EditCategory = ({ category, onSave, onDelete }) => {
  const [title, setTitle] = useState(category.titre_catégorie);
  const [description, setDescription] = useState(category.category_description);

  const handleSave = async (event) => {
    event.preventDefault(); // Prévenir la soumission par défaut du formulaire

    const updatedCategory = {
      ...category,
      titre_catégorie: title,
      category_description: description,
    };

    try {
      await axios.put(`http://localhost:5000/categoryservice/${category.id}`, updatedCategory);
      onSave(updatedCategory); // Appeler onSave avec updatedCategory directement
    } catch (error) {
      console.error('Error updating category:', error.message || error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/categoryservice/${category.id}`);
      onDelete(category.id);
    } catch (error) {
      console.error('Error deleting category:', error.message || error);
    }
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col bg-white shadow-md rounded-lg p-6 m-4 w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Modifier la catégorie</h2>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">{category.titre_catégorie}</h3>
        {category.category_image ? (
          <img src={category.category_image} alt={category.titre_catégorie} className="w-full h-32 object-cover rounded-lg mb-4" />
        ) : (
          <p className="text-gray-600 mb-4">Aucune image</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Titre de la catégorie
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entrez le titre de la catégorie"
          className="border p-3 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description de la catégorie
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Entrez la description de la catégorie"
          className="border p-3 rounded-md w-full"
          rows="4"
        ></textarea>
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-md w-full">
          Enregistrer les modifications
        </button>
        <button type="button" className="bg-red-500 text-white p-3 rounded-md w-full" onClick={handleDelete}>
          Supprimer
        </button>
      </div>
    </form>
  );
};

export default EditCategory;
