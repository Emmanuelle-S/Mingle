import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteButton from './deleteCategorie'; // Assurez-vous que le chemin est correct

const EditCardCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const card = location.state?.card;

  const [title, setTitle] = useState(card ? card.titre : '');
  const [descriptions, setDescription] = useState(card ? card.description : '');
  const [popup, setPopup] = useState({ visible: false, message: '', type: '' });

  useEffect(() => {
    console.log('Popup state changed:', popup);
  }, [popup]);

  const handleSave = async (event) => {
    event.preventDefault();

    if (!card) {
      setPopup({ visible: true, message: 'Aucune catégorie sélectionnée pour modification.', type: 'error' });
      return;
    }

    const updatedCategory = {
      ...card,
      titre: title,
      description: descriptions,
    };

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/categoryservice/${card.id}`, updatedCategory);
      setPopup({ visible: true, message: 'Catégorie modifiée avec succès !', type: 'success' });

      setTimeout(() => {
        setPopup({ visible: false, message: '', type: '' });
        navigate('/listeService');
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error.message || error);
      setPopup({ visible: true, message: 'Erreur lors de la mise à jour de la catégorie : ' + (error.message || error), type: 'error' });
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/categoryservice/${categoryId}`);
      setPopup({ visible: true, message: 'Catégorie supprimée avec succès !', type: 'success' });

      setTimeout(() => {
        setPopup({ visible: false, message: '', type: '' });
        navigate('/listeService');
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error.message || error);
      setPopup({ visible: false, message: 'Erreur lors de la suppression de la catégorie : ' + (error.message || error), type: 'error' });
    }
  };

  if (!card) {
    return <div>Aucune catégorie sélectionnée pour modification.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSave} className="flex flex-col bg-white shadow-md rounded-lg p-6 m-4 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Modifier la catégorie</h2>
        <div className="mb-4 text-center">
          <h3 className="text-lg font-bold mb-2">{card.titre}</h3>
          {card.category_image ? (
            <img src={card.category_image} alt={card.titre} className="w-full h-32 object-cover rounded-lg mb-4" />
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
            value={descriptions}
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
          <DeleteButton categoryId={card.id} onDelete={handleDelete} />
        </div>
        {popup.visible && (
          <div className={`fixed bottom-4 left-4 p-4 rounded-md text-white ${popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {popup.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default EditCardCategory;
