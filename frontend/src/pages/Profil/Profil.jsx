import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonalInfo from "@components/Profil/PersonalInfo";
// import ServicesCarousel from "@components/Profil/ServicesCarousel";
// import RecentChats from "@components/Profil/RecentChats";

import "./Profil.css";

const Profil = () => {
  const [userData, setUserData] = useState(null);
  // const [publishedServices, setPublishedServices] = useState([]);
  // const [recentChats, setRecentChats] = useState([]);
  const isUserLoggedIn = true;

  const fetchData = async () => {
    try {
      const userResponse = await axios.get("http://localhost:5000/users/1"); // Remplacer par l'ID utilisateur dynamique
      setUserData(userResponse.data);

      // const servicesResponse = await axios.get("/api/services");
      // setPublishedServices(servicesResponse.data);

      // const chatsResponse = await axios.get("/api/chats");
      // setRecentChats(chatsResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);

  console.log(userData);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-darkslategray">
        Profil Mingle de {userData.username}
      </h1>
      <PersonalInfo userData={userData} isUserLoggedIn={isUserLoggedIn} />
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
