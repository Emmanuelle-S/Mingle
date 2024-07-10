import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = ({ onAdd, fetchData }) => {
  const [formData, setFormData] = useState({
    titre: '',
    sous_titre: '',
    description: '',
  });

  console.log(formData);
  const [popup, setPopup] = useState({ visible: false, message: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    if (!formData.titre) {
      setPopup({ visible: true, message: 'Le titre de la catégorie ne peut pas être vide.', type: 'error' });
      setTimeout(() => setPopup({ visible: false, message: '', type: '' }), 3000);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/categoryservice`, formData, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        },
      });

      if (response.status === 201 || response.status === 200) { // S'assurer que la requête est réussie
        setPopup({ visible: true, message: 'Nouvelle catégorie ajoutée avec succès !', type: 'success' });
        onAdd(response.data);
        setFormData({
          titre: '',
          sous_titre: '',
          description: '',
        });
        fetchData();
      } else {
        setPopup({ visible: true, message: 'Erreur inattendue lors de l\'ajout de la catégorie.', type: 'error' });
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setPopup({ visible: true, message: 'Erreur lors de l\'ajout de la catégorie : ' + (error.response ? error.response.data : error.message), type: 'error' });
    } finally {
      setTimeout(() => setPopup({ visible: false, message: '', type: '' }), 3000);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded w-80">
      <form onSubmit={handleAdd}>
        <input
          type="text"
          name="titre"
          value={formData.titre}
          onChange={handleInputChange}
          placeholder="Titre de la nouvelle catégorie"
          className="border p-2 rounded-md mb-2 w-full"
        />
        <input
          type="text"
          name="sous_titre"
          value={formData.sous_titre}
          onChange={handleInputChange}
          placeholder="Sous-titre de la nouvelle catégorie"
          className="border p-2 rounded-md mb-2 w-full"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description de la nouvelle catégorie"
          className="border p-2 rounded-md mb-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md w-full mb-2"
        >
          Ajouter
        </button>
      </form>
      {popup.visible && (
        <div className={`fixed bottom-4 left-4 p-4 rounded-md text-white ${popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {popup.message}
        </div>
      )}
    </div>
  );
};

export default AddCategory;
