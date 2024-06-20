import React from 'react';

const PersonalInfo = ({ userData, isUserLoggedIn }) => {
  const { name, email, phone, address, profilePic, services, bio } = userData;

   // Fonction pour gérer le clic sur le bouton Éditer
   const handleEditClick = () => {
    // Redirection vers le composant EditProfil lors du clic sur le bouton Éditer
    history.push('/EditProfil');
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
      </div>
      {isUserLoggedIn && (
        <div className="mt-4 text-center">
          <button className="bg-decent text-white px-4 py-2 rounded-md onClick={handleEditClick}">Éditer</button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
