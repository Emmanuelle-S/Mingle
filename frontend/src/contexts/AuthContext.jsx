// BU

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();
// Création du contexte d'authentification : créé pour partager l'état d'authentification à travers l'application.

export const AuthProvider = ({ children }) => {
  // Composant fournisseur du contexte d'authentification
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Déclare l'état isLoggedIn pour suivre si l'utilisateur est connecté.
  const [userId, setUserId] = useState(null); 
  // Ajout de userId dans le contexte
  const [token, setToken] = useState(null); 

  useEffect(() => {
    // Utilisation de useEffect pour vérifier le statut de connexion 
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    // Récupération du token et de l'ID utilisateur depuis le localStorage
    setIsLoggedIn(!!token && !!userId);
    // Utilise useEffect pour vérifier si un token/id est présent dans le localStorage. Si oui, isLoggedIn est mis à jour à true.
    setUserId(userId); 
    // Mise à jour de userId dans l'état
    setToken(token); 
    // Met à jour le token dans l'état
  }, []);


  const login = async (email, password) => {
    // Fonction de connexion qui prend l'email et le mot de passe en paramètres
    try {
      const response = await axios.post('${import.meta.env.VITE_BACKEND_URL}/user/login', {
        // Envoi d'une requête POST à l'endpoint de connexion avec les informations de l'utilisateur
        mail: email,
        user_pass: password,
      });

      if (response.status === 201) {
        // Si la réponse est réussie, statut 201, on récupère le token et l'ID utilisateur
        const { token, userId } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        // Stockage du token et de l'ID utilisateur dans le localStorage
        setIsLoggedIn(true);
        // Mise à jour de l'état isLoggedIn à true pour indiquer que l'utilisateur est connecté
        setUserId(userId); 
        // Mise à jour de userId dans l'état après connexion
        setToken(token); 
        // Met à jour le token dans l'état après connexion
      } else {
        console.error('Login failed:', response.status);
        // Affichage d'une erreur en cas d'échec de la connexion
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Affichage d'une erreur en cas de problème avec la requête
    }
  };

  const logout = () => {
    // Fonction de déconnexion
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Suppression du token et de l'ID utilisateur du localStorage
    setIsLoggedIn(false);
    // Mise à jour de l'état isLoggedIn à false pour indiquer que l'utilisateur est déconnecté
    setUserId(null); 
    // Réinitialisation de userId dans le contexte après déconnexion
    setToken(null); 
    // Réinitialise le token dans l'état après déconnexion
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );}
  // Rend les valeurs isLoggedIn, login, token et logout disponibles pour les composants enfants.
