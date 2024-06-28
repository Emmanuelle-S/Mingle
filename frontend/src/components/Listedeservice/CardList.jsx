import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Card = ({ card }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-64 h-auto">
      <h3 className="text-lg font-bold mb-2">{card.titre_catégorie}</h3>
      {card.category_image ? (
        <img src={card.category_image} alt={card.titre_catégorie} className="w-full h-32 object-cover rounded-lg" />
      ) : (
        <p className="text-gray-600">Aucune image</p>
      )}
      <p className="text-gray-600 mb-2">{card.titre_sous_catégorie}</p>
      <p className="text-gray-600 mb-2">{card.category_description || 'No description available'}</p>
    </div>
  );
};

const CardList = () => {
  const [cards, setCards] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categoryservice');
      console.log('Response:', response.data); // Log de la réponse pour débogage
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message || error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardList;
