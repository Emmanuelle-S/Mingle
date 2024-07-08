import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CardDetail() {
  const [card, setCardDetail] = useState(null);

  const fetchDataDetail = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categoryservice");
      console.log('response', response.data);
      if (response.data.length > 0) {
        setCardDetail(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching data', error.message || error);
    }
  };

  useEffect(() => {
    fetchDataDetail();
  }, []);

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-56 mt-16">
      <div className="bg-primary shadow-md rounded-lg p-6 m-4 w-full max-w-2xl flex flex-col justify-between h-70">
        <h3 className=" text-white text-center h-8">{card.titre_catégorie}</h3>
        <p className="text-white text-center mb-6">{card.category_description}</p>
        <div className="mt-auto flex justify-center">
          <button className="bg-blue-500 text-center text-white p-2 rounded-md">Contact Batman</button>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
