import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Card = ({ card }) => {
  return (
    <div className="bg-white h-60 border-slate-800 shadow-md rounded-lg p-4 m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <h3 className="text-center text-lg font-bold mb-2">{card.titre_catégorie}</h3>
      <p className="text-gray-600 text-center">{card.titre_sous_catégorie}</p>
    </div>
  );
};

const CardList = () => {
  const [cards, setCards] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categoryservice');
      console.log('Données récupérées:', response.data); // Log de la réponse pour débogage

      // Assurez-vous que les identifiants sont uniques
      const responseData = response.data.map((card, index) => ({
        ...card,
        id: `api-${index}`
      }));

      // Données statiques à combiner avec les données récupérées
      const staticCards = [
        
      ];

      // Combinaison des données récupérées et des données statiques
      const combinedCards = [...responseData, ...staticCards];
      console.log('Données combinées:', combinedCards); // Log des données combinées

      setCards(combinedCards);
    } catch (error) {
      console.error('Error fetching data:', error.message || error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Titre de la Liste des Cartes</h2>
      <div className="flex flex-wrap justify-center">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
