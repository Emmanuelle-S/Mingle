import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card'; // Assurez-vous que le chemin est correct

const CardList = () => {
  // Définir les états locaux pour les cartes, le chargement et les erreurs
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utiliser useEffect pour effectuer l'appel API une fois que le composant est monté
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Effectuer une requête GET à l'API pour récupérer les données des catégories de service
        const response = await axios.get('http://localhost:5000/categoryservice');
        console.log(response); // Log de la réponse pour débogage
        setCards(response.data); // Mettre à jour l'état des cartes avec les données reçues
        setLoading(false); // Indiquer que le chargement est terminé
      } catch (error) {
        // Gérer les erreurs en les enregistrant dans l'état
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData(); // Appeler la fonction fetchData pour récupérer les données
  }, []); // Le tableau vide signifie que ce useEffect s'exécute uniquement au montage du composant

  // Afficher un message de chargement pendant que les données sont en cours de récupération
  if (loading) {
    return <div>Loading...</div>;
  }

  // Afficher un message d'erreur si une erreur est survenue lors de la récupération des données
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Afficher les cartes une fois les données récupérées avec succès
  return (
    <div className="flex flex-wrap bg-red-500">
      {cards.map((card, index) => (
        <Card
          key={index} // Utiliser l'index comme clé pour chaque élément de la liste
          title={card.titre_catégorie} // Passer le titre de la catégorie comme prop au composant Card
          imageUrl={card.imageUrl} // Assurez-vous que cette colonne existe dans votre table
          category={card.titre_sous_catégorie} // Passer le titre de la sous-catégorie comme prop au composant Card
          description={card.description} // Assurez-vous que cette colonne existe dans votre table
          date={card.date} // Assurez-vous que cette colonne existe dans votre table
        />
      ))}
    </div>
  );
};

export default CardList;
