import React from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalInfo = ({ userData, isLoggedIn, isCurrentUser, onDelete }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/EditProfil', { state: { userData } });
  };

  const handleDeleteClick = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.")) {
      onDelete();
    }
  };

  return (
    <div className="w-full p-8 border-solid bg-white rounded-lg border border-gray-300 shadow-2xl">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-darkslategray">Informations personnelles</h2>
      <div className="flex flex-col md:flex-row gap-8 p-4">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-darkslategray">Nom</label>
            <p className="mt-1 text-m rounded-lg border border-darkslategray p-1">{userData.username}</p>
          </div>
          <div>
            <label className="block text-darkslategray">Email</label>
            <p className="mt-1 text-m rounded-lg border border-darkslategray p-1">{userData.mail}</p>
          </div>
          <div>
            <label className="block text-darkslategray">Ville</label>
            <p className="mt-1 text-m rounded-lg border border-darkslategray p-1">{userData.localisation}</p>
          </div>
          <div>
            <label className="block text-darkslategray">Type de Service Proposés</label>
            <p className="mt-1 text-m rounded-lg border border-darkslategray p-1">{userData.service_type}</p>
          </div>
        </div>
        <div className="flex-1 space-y-32">
          <div>
            <label className="block text-darkslategray text-center">Photo de profil</label>
            <p className="mt-1 text-sm text-center">{userData.avatar}</p>
          </div>
          <div>
            <label className="block text-darkslategray text-center">Biographie</label>
            <p className="mt-1 rounded-lg border border-darkslategray p-1 w-1/2 mx-auto h-24 overflow-auto text-l">{userData.biographie}</p>
          </div>
        </div>
      </div>
      {isLoggedIn && isCurrentUser && (
        <div className="mt-4 text-center space-x-4 flex">
          <button className="bg-accent hover:bg-blue-700 text-white py-2 px-9 rounded-lg text-lg font-medium focus:outline-none focus:shadow-outline" onClick={handleEditClick}>
            Éditer
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-7 rounded-lg text-lg font-medium focus:outline-none focus:shadow-outline" onClick={handleDeleteClick}>
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
