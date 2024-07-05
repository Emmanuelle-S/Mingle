import { useState, useEffect } from 'react';
import axios from 'axios';
import AddCategory from './AddCardCategorie';
import EditCategory from './EditCardCategory';

const defaultImage = 'https://via.placeholder.com/150'; // URL de l'image par défaut

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
      <div className='flex justify-end'>
        <button className="bg-accent text-white p-2 rounded-md" onClick={() => onEdit(card)}>
          Edit
        </button>
      </div>
    </div>
  );
};

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

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

  const addCard = (newCard) => {
    setCards(prevCards => [...prevCards, newCard]);
  };

  const addEdit = () => {
    // logiques d'édition
  };

  const updateCard = (updatedCard) => {
    setCards(prevCards => prevCards.map(card => card.id === updatedCard.id ? updatedCard : card));
    setSelectedCard(null);
  };

  const deleteCard = (id) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
    setSelectedCard(null);
  };

  return (
    <div className="flex flex-col items-center">
      <AddCategory onAdd={addCard} onAddEdit={addEdit} />
      {selectedCard ? (
        <EditCategory 
          category={selectedCard} 
          onSave={updateCard} 
          onDelete={deleteCard} 
        />
      ) : (
        <>
          <div className="flex flex-wrap justify-center">
            {cards.map((card) => (
              <Card key={card.id} card={card} onEdit={setSelectedCard} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardList;
