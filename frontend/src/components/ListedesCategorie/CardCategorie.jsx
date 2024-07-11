import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddCategory from './AddCardCategorie';

const defaultImage = 'https://via.placeholder.com/150'; // URL de l'image par défaut

// Composant Card pour afficher les informations de chaque catégorie
const Card = ({ card, onEdit }) => {

  // console.log(card);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/service', { state: { card } }); // Envoyer les données de la carte à la route /service
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Empêcher la propagation de l'événement pour éviter la navigation
    navigate(`/edit-category/${card.id}`, { state: { card } });
  };
  

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 m-2 w-80 h-80 flex flex-col justify-between border border-black cursor-pointer"
      onClick={handleCardClick}
    >
      <div>
        <h2 className="text-center font-bold mb-2">{card.titre}</h2>
        <p>{card.description}</p>
        <img
          src={card.category_image || defaultImage}
          alt={card.titre}
          className="w-full h-32 object-cover rounded-lg"
        />
      </div>
      <div className='flex justify-end'>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleEditClick}
        >
          Editer
        </button>
      </div>
    </div>
  );
};

// Composant CardList pour gérer la liste des catégories
const CardCategorie = () => {
  const [cards, setCards] = useState([]); // État pour stocker les cartes
  const [selectedCard, setSelectedCard] = useState(null); // État pour stocker la carte sélectionnée pour l'édition

  // Fonction pour récupérer les données de l'API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categoryservice');
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

          <Card key={card.id} card={card} onEdit={() => navigate(`/edit-category/${card.id}`, { state: { card } })} />
        ))}


      </div>
    </div>
  );
};

export default CardCategorie;
