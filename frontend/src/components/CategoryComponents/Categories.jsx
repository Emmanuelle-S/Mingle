
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddCategory from './AddCategory';
import Category from './Category';


const Categories = () => {
  const [cards, setCards] = useState([]); // État pour stocker les cartes
  const [selectedCard, setSelectedCard] = useState(null); // État pour stocker la carte sélectionnée pour l'édition
  const navigate = useNavigate();

  // Fonction pour récupérer les données de l'API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/categoryservice`);
      console.log('Response:', response.data); // Log de la réponse pour débogage
      setCards(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error.message || error);
    }
  };

  // Utiliser useEffect pour récupérer les données lorsque le composant est monté
  useEffect(() => {
    fetchData();
  }, []);

  // Fonction pour ajouter une nouvelle carte
  const addCard = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  // Fonction pour mettre à jour une carte existante
  const updateCard = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
    setSelectedCard(null); // Réinitialiser la carte sélectionnée après la mise à jour
  };

  // Fonction pour supprimer une carte
  const deleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    setSelectedCard(null); // Réinitialiser la carte sélectionnée après la suppression
  };

  return (
    <div className="flex flex-col items-center">
      {!selectedCard && <AddCategory onAdd={addCard} fetchData={fetchData} />}
      <div className="flex flex-wrap justify-center">
        {cards.map((card) => (
          <Category key={card.id} card={card} onEdit={() => navigate(`/edit-category/${card.id}`, { state: { card } })} />
        ))}
      </div>
    </div>
  );

};

export default Categories;