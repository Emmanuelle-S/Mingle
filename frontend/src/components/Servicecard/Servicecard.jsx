// ServiceCard.jsx
import React from 'react';

const Servicecard = ({ service }) => (
  <div className="w-full p-4 pb-20 border-solid bg-white rounded-lg border border-gray-300 shadow-2xl relative">
    <p className="font-bold text-xl">{service.titre}</p>
    <p>{service.description}</p>
    <p>Status : {service.status ? 'activé' : 'désactivé'}</p>
  </div>
);

export default Servicecard;
