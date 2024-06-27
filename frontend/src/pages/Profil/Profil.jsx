// npm install react-toastify


import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonalInfo from "@components/Profil/PersonalInfo";
import "./Profil.css";

const Profil = () => {
  // Déclaration du composant fonctionnel Profil
  const [userData, setUserData] = useState(null);
  // Utilisation du hook useState pour créer une variable d'état userData initialisée à null, et une fonction setUserData pour la mettre à jour.
  const [isDeleted, setIsDeleted] = useState(false);
  const isUserLoggedIn = true;
  // Déclaration d'une constante isUserLoggedIn avec une valeur true (indique que l'utilisateur est connecté).

  const fetchData = async () => {
    // Déclaration d'une fonction asynchrone fetchData pour récupérer les données utilisateur.
    try {
      const userId = localStorage.getItem("userId");
      // Récupération de l'ID de l'utilisateur depuis le localStorage.
      const token = localStorage.getItem("token");
      // Récupération du token d'authentification depuis le localStorage.

      const userResponse = await axios.get(
        `http://localhost:5000/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //  Envoi d'une requête GET pour récupérer les données de l'utilisateur en utilisant axios`, avec le token dans les en-têtes de la requête
      setUserData(userResponse.data);
      // Mise à jour de l'état userData avec les données reçues de la réponse.
    } catch (error) {
      console.error("Error fetching data", error);
      // Gestion des erreurs en cas d'échec de la requête, avec un log de l'erreur.
    }
  };

  const handleDeleteProfile = async () => {
    //  Déclaration d'une fonction asynchrone handleDeleteProfile pour supprimer le profil utilisateur.
    try {
      const userId = localStorage.getItem("userId");
      // Récupération de l'ID de l'utilisateur depuis le localStorage.
      const token = localStorage.getItem("token");
      // Récupération du token d'authentification depuis le localStorage.

      const response = await axios.delete(
        `http://localhost:5000/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Envoi d'une requête DELETE pour supprimer le profil de l'utilisateur en utilisant axios`, avec le token dans les en-têtes de la requête.

      if (response.status === 204) {
        console.log("Profil supprimé avec succès.");
        //  Vérification si la réponse de la requête indique une suppression réussie (statut 204) + log d'un message de succès
        localStorage.removeItem("userId");
        // Suppression de l'ID de l'utilisateur du localStorage.
        localStorage.removeItem("token");
        // Suppression du token du localStorage.
        toast.success("Votre profil a été supprimé avec succès.", {
          // Utilisation de react-toastify
          position: "top-center", 
          // Position centrée en haut
          className: "custom-toast", 
          // Classe CSS personnalisée
          autoClose: 2000, 
          // Durée de fermeture automatique
        });
       
        setIsDeleted(true);
      } else {
        console.error("Erreur lors de la suppression du profil");
        // Log d'une erreur si la suppression n'est pas réussie.
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du profil", error);
      // Gestion des erreurs en cas d'échec de la requête, avec un log de l'erreur.
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-darkslategray">
        Profil Mingle de {userData.username}
      </h1>
      <PersonalInfo
        userData={userData}
        isUserLoggedIn={isUserLoggedIn}
        onDelete={handleDeleteProfile}
      />
      {/* Rendu du composant PersonalInfo avec les props userData, isUserLoggedIn, et onDelete. */}
      <div className="mt-8 bg-white rounded-lg border border-gray-300 shadow-2xl p-4">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-darkslategray">
          Services publiés
        </h2>
      </div>
      <div className="mt-8 bg-white rounded-lg border border-gray-300 shadow-2xl p-4">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-darkslategray">
          Échanges récents
        </h2>
      </div>
      <ToastContainer />
      {/* Ajout du ToastContainer pour afficher les notifications */}
    </div>
  );
};

export default Profil;
