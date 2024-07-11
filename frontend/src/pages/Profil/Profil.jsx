import React, { useState, useEffect } from "react";
import axios from "axios"; // effectuer des requêtes HTTP.
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonalInfo from "@components/Profil/PersonalInfo";
import Servicecard from "@components/Servicecard/Servicecard";

// import ServicesCarousel from "@components/Profil/ServicesCarousel"; // Importez votre composant
import { useParams, useNavigate } from "react-router-dom";
import "./Profil.css";

const Profil = () => {
  // Déclaration du composant fonctionnel Profil
  const [userData, setUserData] = useState(null); //Rappel useState : permet de gérer les états
  const [isDeleted, setIsDeleted] = useState(false); // indiquer si le profil a été supprimé, initialisé à false.
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Etat pour savoir si l'utilisateur est connecté
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const { userId: routeUserId } = useParams(); // récupère des paramètres de l'URL.
  const currentUserId = localStorage.getItem("userId"); // récupère des paramètres du local storage
  const userId = routeUserId || currentUserId; // compare les données récupérées du local storage et de l'URL
  const isCurrentUser = userId === currentUserId; // vérifie si l'utilisateur actuel est celui du profil

  const fetchData = async () => {
    // Déclaration d'une fonction asynchrone fetchData pour récupérer les données utilisateur.
    try {
      const token = localStorage.getItem("token"); // Récupération du token d'authentification depuis le localStorage.
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const userResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        { headers }
      );
      //  Envoi d'une requête GET pour récupérer les données de l'utilisateur en utilisant axios, avec le token dans les en-têtes de la requête si disponible
      setUserData(userResponse.data); // Mise à jour de l'état userData avec les données reçues de la réponse.

      if (token) {
        setIsLoggedIn(true); // Si un token est présent, l'utilisateur est connecté
      }
      // Fetch services for the user
      const servicesResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/service?userId=${userId}`,
        { headers }
      );
      setServices(servicesResponse.data.slice(0, 3)); // Get the first 3 services
    } catch (error) {
      console.error("Error fetching data", error); // Gestion des erreurs en cas d'échec de la requête, avec un log de l'erreur.
    }
  };

  const handleDeleteProfile = async () => {
    //  Déclaration d'une fonction asynchrone handleDeleteProfile pour supprimer le profil utilisateur.
    try {
      const token = localStorage.getItem("token"); // Récupération du token d'authentification depuis le localStorage.

      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Envoi d'une requête DELETE pour supprimer le profil de l'utilisateur en utilisant axios, avec le token dans les en-têtes de la requête.

      if (response.status === 204) {
        console.log("Profil supprimé avec succès."); //  Vérification si la réponse de la requête indique une suppression réussie (statut 204) + log d'un message de succès
        localStorage.removeItem("userId"); // Suppression de l'ID de l'utilisateur du localStorage.
        localStorage.removeItem("token"); // Suppression du token du localStorage.
        toast.success("Votre profil a été supprimé avec succès.", {
          // Utilisation de react-toastify et afficher une popup en cas de succès
          position: "top-center", // Position centrée en haut
          className: "custom-toast", // Classe CSS personnalisée
          autoClose: 2000, // Durée de fermeture automatique
        });

        setIsDeleted(true);
      } else {
        console.error("Erreur lors de la suppression du profil"); // Log d'une erreur si la suppression n'est pas réussie.
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du profil", error); // Gestion des erreurs en cas d'échec de la requête, avec un log de l'erreur.
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // Utilisation du hook useEffect pour appeler fetchData une seule fois après le premier rendu du composant.

  useEffect(() => {
    if (isDeleted) {
      setTimeout(() => {
        window.location.href = "/";
      }, 3000); // Redirection après 3 secondes
    }
  }, [isDeleted]);

  if (!userData) {
    return <div>Loading...</div>;
    //  Affichage d'un message de chargement si userData est encore null.
  }

  const handleSeeMoreClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  };
  // naviguer vers le tableau de bord si l'utilisateur est connecté.

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-darkslategray">
        Profil Mingle de {userData.username}
      </h1>
      <PersonalInfo
        userData={userData}
        isLoggedIn={isLoggedIn}
        isCurrentUser={isCurrentUser}
        onDelete={handleDeleteProfile}
      />
      {/* Rendu du composant PersonalInfo avec les props userData, isLoggedIn, isCurrentUser et onDelete. */}
      <div className="mt-8 bg-white rounded-lg border border-gray-300 shadow-2xl p-4">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-darkslategray">
          Services publiés
        </h2>
        <div className="flex flex-wrap gap-3">
          {services.map((service) => (
            <Servicecard key={service.id} service={service} />
          ))}
        </div>
        {/* <ServicesCarousel services={userData.services} isLoggedIn={isLoggedIn} /> */}
        <div className="text-center mt-4">
          {isLoggedIn ? (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-lg font-medium focus:outline-none focus:shadow-outline"
              onClick={handleSeeMoreClick}
            >
              Voir plus
            </button>
          ) : (
            <p className="text-gray-500">
              Connectez-vous pour voir plus de détails
            </p>
          )}
        </div>
      </div>
      <ToastContainer />
      {/* Ajout du ToastContainer pour afficher les notifications */}
    </div>
  );
};

export default Profil;
