import React, { useState } from 'react';
import axios from 'axios';

// Composant AddCategory pour ajouter une nouvelle catégorie
const AddCategory = ({ onAdd, fetchData }) => {
  // État pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    category_image: '', // Ajout du champ imageUrl
  });

  // État pour gérer l'affichage des messages contextuels (popup)
  const [popup, setPopup] = useState({ visible: false, message: '', type: '' });

  // Fonction pour mettre à jour les données du formulaire lorsqu'un champ change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Fonction pour gérer l'ajout de la catégorie lors de la soumission du formulaire
  const handleAdd = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission

    // Vérification si le champ "titre" est vide
    if (!formData.titre) {
      setPopup({ visible: true, message: 'Le titre de la catégorie ne peut pas être vide.', type: 'error' });
      setTimeout(() => setPopup({ visible: false, message: '', type: '' }), 3000);
      return; // Arrête l'exécution si le titre est vide
    }

    try {
      // Envoi des données du formulaire au backend
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/categoryservice`, formData, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        },
      });

      // Vérifie si la requête a réussi
      if (response.status === 201 || response.status === 200) {
        setPopup({ visible: true, message: 'Nouvelle catégorie ajoutée avec succès !', type: 'success' });
        onAdd(response.data); // Appelle la fonction onAdd passée en props pour mettre à jour l'état parent
        setFormData({
          titre: '',
          description: '',
          category_image: '', // Réinitialiser le champ imageUrl
        });
        fetchData(); // Rafraîchit les données après l'ajout
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
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description de la nouvelle catégorie"
          className="border p-2 rounded-md mb-2 w-full"
        />
        <input
          type="url"
          name="category_image"
          value={formData.category_image}
          onChange={handleInputChange}
          placeholder="Lien de l'image de la nouvelle catégorie"
          className="border p-2 rounded-md mb-2 w-full"
        />
        {formData.category_image && (
          <div className="mb-2">
            <img src={formData.category_image} alt="Prévisualisation de la catégorie" className="max-w-full h-auto" />
          </div>
        )}
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
