import { useNavigate } from 'react-router-dom';

const Category = ({ card, onEdit }) => {
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
        className="bg-white shadow-md rounded-lg p-4 m-2 w-80 h-96 flex flex-col justify-between border border-black cursor-pointer"
        onClick={handleCardClick}
      >
        <div>
          <h2 className="text-center font-bold mb-2">{card.titre}</h2>
          <img src={card.category_image??`https://placehold.co/600x400?text=`} alt={card.titre} className="w-full h-40 object-cover" />
          <p className="text-center mt-7">{card.description}</p>
        </div>
        <div className="flex justify-end">
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

  export default Category