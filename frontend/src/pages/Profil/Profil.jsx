// import {Header} from
// import {Footer} from
import React from 'react';
// import EditProfil from "@components/Profil/EditProfil"
import "./Profil.css";

import PersonalInfo from "@components/Profil/PersonalInfo"; // Import du composant PersonalInfo
import ServicesCarousel from "@components/Profil/ServicesCarousel"; // Import du composant ServicesCarousel
import RecentChats from "@components/Profil/RecentChats"; // Import du composant RecentChats

const Profil = () => {
  // Exemple de données pour les informations personnelles (à remplacer par les données réelles)
  const userData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    address: '123 Main St, Anytown, USA',
    profilePic: 'https://via.placeholder.com/150',
    services: ['Service A', 'Service B', 'Service C'],
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  };

  // Exemple de données pour les services publiés (à remplacer par les données du BACKEND)
  const publishedServices = [
    { id: 1, title: 'Service 1', description: 'Description du service 1', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Service 2', description: 'Description du service 2', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Service 3', description: 'Description du service 3', imageUrl: 'https://via.placeholder.com/300' },
  ];

  // Exemple de données pour les échanges récents (à remplacer par les données du BACKEND)
  const recentChats = [
    { id: 1, user: 'Utilisateur A', message: 'Message de l\'utilisateur A' },
    { id: 2, user: 'Utilisateur B', message: 'Message de l\'utilisateur B' },
    { id: 3, user: 'Utilisateur C', message: 'Message de l\'utilisateur C' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-darkslategray"> Profil Mingle de {userData.name}</h1>
      {/* Bloc d'informations personnelles */}
      <PersonalInfo userData={userData} />

      {/* Bloc de services publiés */}
      <div className="mt-8  bg-white rounded-lg border border-gray-300 shadow-2xl p.8">
        <h2 className="text-2xl font-bold mb-4 text-darkslategray">Services publiés</h2>
        <ServicesCarousel services={publishedServices} />
      </div>

      {/* Bloc des échanges récents */}
      <div className="mt-8 bg-white rounded-lg border border-gray-300 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-darkslategray ">Échanges récents</h2>
        <RecentChats chats={recentChats} />
      </div>
    </div>
  );
};

export default Profil;