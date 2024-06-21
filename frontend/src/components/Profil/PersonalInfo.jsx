import React from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalInfo = ({ userData, isUserLoggedIn }) => {
    const navigate = useNavigate();
  const { name, email, phone, address, profilePic, services, bio } = userData;
  

   // Fonction pour gérer le clic sur le bouton Éditer
   const handleEditClick = () => {
    // Redirection vers le composant EditProfil lors du clic sur le bouton Éditer
    navigate('/EditProfil', { state: { userData } });
  };

  return (
    <div className="w-full p-8 border-solid bg-white rounded-lg border border-gray-300 shadow-2xl">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-darkslategray">Informations personnelles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-darkslategray">Nom</label>
          <p className="mt-1 text-sm">{name}</p>
        </div>
        <div>
          <label className="block text-darkslategray">Email</label>
          <p className="mt-1 text-sm">{email}</p>
        </div>
        <div>
          <label className="block text-darkslategray">Téléphone</label>
          <p className="mt-1 text-sm">{phone}</p>
        </div>
        <div>
          <label className="block text-darkslategray">Adresse</label>
          <p className="mt-1 text-sm">{address}</p>
        </div>
        <div className="col-span-2">
          <label className="block text-darkslategray">Biographie</label>
          <p className="mt-1 text-sm">{bio}</p>
        </div>
        <div className="col-span-2">
          <label className="block text-darkslategray">Type de Service Proposés</label>
          <p className="mt-1 text-sm">{services}</p>
        </div>
        <div className="col-span-2">
          <label className="block text-darkslategray">Photo de profil</label>
          <p className="mt-1 text-sm">{profilePic}</p>
        </div>
      </div>
      {isUserLoggedIn && (
        <div className="mt-4 text-center">
          <button className="bg-accent hover:bg-blue-700 text-white py-2 px-9 rounded-lg text-lg font-medium focus:outline-none focus:shadow-outline" onClick={handleEditClick} >Éditer</button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
