import React from 'react';
import Card from './Card'; // Assurez-vous que le chemin est correct

const CardList = ({ cards }) => {
  return (
    <div className="flex flex-wrap">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          imageUrl={card.imageUrl}
          category={card.category}
          description={card.description}
          date={card.date}
        />
      ))}
    </div>
  );
};

export default CardList;
