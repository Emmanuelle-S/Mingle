import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CardDetail() {
  const [card, setCardDetail] = useState(null);

  const fetchDataDetail = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categoryservice");
      console.log('response', response.data);
      if (response.data.length > 0) {
        setCardDetail(response.data[0]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error.message || error);
    }
  };

  useEffect(() => {
    fetchDataDetail();
  }, []);

  if (!card) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="bg-primary shadow-md rounded-lg p-6 m-4 w-full h-[600px] max-w-2xl flex flex-col justify-between">
        <p className="text-white text-center mb-6">{card.category_description}</p>
        <div className="flex flex-wrap justify-center mb-6">
          {card.category_image && (
            <img src={card.category_image} alt={card.titre_catégorie} className="w-full h-32 object-cover rounded-lg" />
          )}
        </div>
        <div className="mt-auto flex justify-end">
          <button className="bg-blue-500 text-center text-white p-2 rounded-md">Contacter Batman</button>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
