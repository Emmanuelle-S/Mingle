import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayCards = ({ cards }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-64 h-auto">
      <h3 className="text-lg font-bold mb-2">{cards.titre_catégorie}</h3>
      <p className="text-gray-500">description :</p>
    </div>
  );
};

function CardDetail() {
  const [Card, setCardDetail] = useState([]);

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
    <div className="flex flex-wrap justify-center">
      {Card.length > 0 ? (
        Card.map((cardsDetail) => (
          <DisplayCards key={cardsDetail.id} cards={cardsDetail} />
        ))
      ) : (
        <p>Aucune donnée disponible</p>
      )}
    </div>
  );
}

export default CardDetail;
