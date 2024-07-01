import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifie si un token est présent dans le localStorage pour déterminer si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!token && !!userId);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        mail: email,
        user_pass: password,
      });

      if (response.status === 201) {
        const { token, userId } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        setIsLoggedIn(true);
      } else {
        console.error('Login failed:', response.status);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
