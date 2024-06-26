import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonalInfo from "@components/Profil/PersonalInfo";
// import ServicesCarousel from "@components/Profil/ServicesCarousel";
// import RecentChats from "@components/Profil/RecentChats";
import "./Profil.css";

const Profil = () => {
  const [userData, setUserData] = useState(null);
  const isUserLoggedIn = true;

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      const userResponse = await axios.get(`http://localhost:5000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserData(userResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      const response = await axios.delete(`http://localhost:5000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 204) {
        console.log('Profil supprimé avec succès.');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        window.location.href = '/';
      } else {
        console.error('Erreur lors de la suppression du profil');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du profil', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-darkslategray">
        Profil Mingle de {userData.username}
      </h1>
      <PersonalInfo userData={userData} isUserLoggedIn={isUserLoggedIn} onDelete={handleDeleteProfile} />
      <div className="mt-8 bg-white rounded-lg border border-gray-300 shadow-2xl p-4">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-darkslategray">
          Services publiés
        </h2>
        {/* <ServicesCarousel services={publishedServices} /> */}
      </div>
      <div className="mt-8 bg-white rounded-lg border border-gray-300 shadow-2xl p-4">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-darkslategray">
          Échanges récents
        </h2>
        {/* <RecentChats chats={RecentChats} /> */}
      </div>
    </div>
  );
};

export default Profil;
