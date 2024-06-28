import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Card = ({ card }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-64 h-60">
      <h3 className="text-lg font-bold mb-2">{card.titre_catégorie}</h3>
      <p className="text-gray-600">{card.titre_sous_catégorie}</p>
    </div>
  );
};

const CardList = () => {
  const [cards, setCards] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categoryservice');
      console.log('Response:', response); // Log de la réponse pour débogage
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message || error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Exemple de données statiques pour les cartes
  const exampleCards = [
   
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {exampleCards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardList;
