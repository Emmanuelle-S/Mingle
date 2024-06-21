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
  <div className="flex flex-col md:flex-row gap-8 p-4">
    <div className="flex-1 space-y-4">
      <div >
        <label className="block text-darkslategray">Nom</label>
        <p className="mt-1 text-m rounded-lg border border-darkslategray p-1">{name}</p>
      </div>
      <div>
        <label className="block text-darkslategray">Email</label>
        <p className="mt-1 text-m rounded-lg border border-darkslategray p-1">{email}</p>
      </div>
      <div>
        <label className="block text-darkslategray">Téléphone</label>
        <p className="mt-1 text-m rounded-lg border border-darkslategray p-1">{phone}</p>
      </div>
      <div>
        <label className="block text-darkslategray">Adresse</label>
        <p className="mt-1 text-m rounded-lg border border-darkslategray p-1">{address}</p>
      </div>
      <div>
        <label className="block text-darkslategray">Type de Service Proposés</label>
        <p className="mt-1 text-m rounded-lg border border-darkslategray p-1">{services}</p>
      </div>
    </div>
    <div className="flex-1 space-y-32">
      <div>
        <label className="block text-darkslategray text-center">Photo de profil</label>
        <p className="mt-1 text-sm text-center">{profilePic}</p>
      </div>
      <div>
        <label className="block text-darkslategray text-center">Biographie</label>
        <p className="mt-1 rounded-lg border border-darkslategray p-1 w-1/2 mx-auto h-24 overflow-auto text-l">{bio}</p>
      </div>
    </div>
  </div>
  {isUserLoggedIn && (
    <div className="mt-4 text-center">
      <button className="bg-accent hover:bg-blue-700 text-white py-2 px-9 rounded-lg text-lg font-medium focus:outline-none focus:shadow-outline" onClick={handleEditClick} >
        Éditer
      </button>
    </div>
  )}
</div>

  );
};

export default PersonalInfo;
