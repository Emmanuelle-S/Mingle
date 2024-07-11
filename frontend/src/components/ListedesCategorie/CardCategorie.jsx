import { useState, useEffect } from 'react';
import axios from 'axios';
import AddCategory from './AddCardCategorie';
import EditCategory from './EditCardCategory';

const defaultImage = 'https://via.placeholder.com/150'; // URL de l'image par défaut

// Composant Card pour afficher les informations de chaque catégorie
const Card = ({ card, onEdit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-80 h-80 flex flex-col justify-between border border-black">
      <div>
        <h3 className="text-lg font-bold mb-2">{card.titre_catégorie}</h3>
        <img
          src={card.category_image || defaultImage}
          alt={card.titre_catégorie}
          className="w-full h-32 object-cover rounded-lg"
        />
      </div>
      <div className="flex justify-end">
        <button className="bg-accent text-white p-2 rounded-md" onClick={() => onEdit(card)}>
          Modifier
        </button>
      </div>
    </div>
  );
};

// Composant CardList pour gérer la liste des catégories
const CardList = () => {
  const [cards, setCards] = useState([]); // État pour stocker les cartes
  const [selectedCard, setSelectedCard] = useState(null); // État pour stocker la carte sélectionnée pour l'édition

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
      {/* Afficher le formulaire d'ajout si aucune carte n'est sélectionnée */}
      {!selectedCard && <AddCategory onAdd={addCard} fetchData={fetchData} />}
      {selectedCard ? (
        <EditCategory
          category={selectedCard}
          onSave={updateCard}
          onDelete={deleteCard}
        />
      ) : (
        <div className="flex flex-wrap justify-center">
          {/* Afficher les cartes */}
          {cards.map((card) => (
            <Card key={card.id} card={card} onEdit={setSelectedCard} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
