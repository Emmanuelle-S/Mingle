import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CardDetail() {
  const [card, setCardDetail] = useState([]);

  const fetchDataDetail = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categoryservice");
      console.log('response', response.data); // Ajoutez cette ligne pour vérifier les données
      setCardDetail(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error.message || error);
    }
  };

  useEffect(() => {
    fetchDataDetail();
  }, []);


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-500 shadow-md rounded-lg p-6 m-4 w-full h-96 max-w-2xl flex flex-col justify-between">
        <h3 className="text-lg font-bold mb-4 text-center">{card.titre_catégorie}</h3>
        <div className="flex flex-wrap justify-center mb-6">
          {card.category_image ? (
            <img src={card.category_image} alt={card.titre_catégorie} className="w-full h-48 object-cover rounded-lg mb-4" />
          ) : (
            <p className="text-white">Aucune image</p>
          )}
        </div>
        <p className="text-white text-center mb-6">{card.description}</p>
        <div className="mt-auto flex justify-end">
          <button className="bg-accent text-white p-2 rounded-full" style={{ borderRadius: '50px', borderColor: 'gray' }}>
            Contacter-nous
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
