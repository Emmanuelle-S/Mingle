import React from 'react';

const Card = ({ title, imageUrl, category, description, date }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <div className="card-body">
        <h2>{title}</h2>
        <p>{category}</p>
        <p>{description}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default Card;
