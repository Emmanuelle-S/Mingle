import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    titre_catégorie: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    if (!formData.titre_catégorie) {
      alert('Le titre de la catégorie ne peut pas être vide.');
      return;
    }

    const data = new FormData();
    data.append('titre_catégorie', formData.titre_catégorie);
    data.append('category_image', imageFile);

    console.log(data);
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:5000/categoryservice', formData, {
        headers: {
      "accept": "application/json",
      "content-type": "application/json",
         
        },
      });
      console.log('New category added:', response.data);
      onAdd(response.data);

      setFormData({
        titre_catégorie: '',
      
      });
      setImageFile(null);
    } catch (error) {
      console.error('Error adding new category:', error.message || error);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded w-80">
      <form onSubmit={handleAdd}>
        <input
          type="text"
          name="titre_catégorie"
          value={formData.titre_catégorie}
          onChange={handleInputChange}
          placeholder="Titre de la nouvelle catégorie"
          className="border p-2 rounded-md mb-2 w-full"
        />
        <input
          type="text"
          name="titre_sous_catégorie"
          value={formData.titre_sous_catégorie}
          onChange={handleInputChange}
          placeholder="Sous-titre de la nouvelle catégorie"
          className="border p-2 rounded-md mb-2 w-full"
        />
        <input
          type="file"
          name="category_image"
          onChange={handleImageChange}
          className="border p-2 rounded-md mb-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md w-full mb-2"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
