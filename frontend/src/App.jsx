import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ServiceProvider } from "./contexts/ServiceContext";
import "./App.css";
import axios from "axios";
import Header from "./components/Header/Header.jsx";
import ChatBubble from "./pages/Message/Bubble";
import filterUserFriends from "./utils/filterUserFriends";
import AnimatedRoutes from "./components/AnimatedRoutes/AnimatedRoutes"; // Déplacez AnimatedRoutes dans un fichier séparé
import { jwtDecode } from "jwt-decode";
import Footer from "@components/Footer/Footer";

function App() {
  const [currentToken, setCurrentToken] = useState(null);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  const [user, setUser] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [userFriends, setUserFriends] = useState(null);

  const fetchMingle = async (userId) => {
    try {
      const responseUsers = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`);
      setUsers(responseUsers.data);

      const responseFriends = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/friends`);
      const filteredFriends = await responseFriends.data.filter(
        (friend) => friend.user_id === userId
      );
      setFriends(filteredFriends);

      const responseConversation = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/conversation`
      );
      const filteredConversation = await responseConversation.data.filter(
        (conversation) =>
          conversation.user_id === userId || conversation.friend_id === userId
      );
      setConversations(filteredConversation);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Recupére l'id dans le payload via jwt-decode
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.sub) {
          setCurrentToken(decodedToken.sub);
        } else {
          console.log("Token is missing 'sub' property");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No token found in localStorage");
    }
  }, []);

  // Si get token alors fetchMingle
  useEffect(() => {
    if (currentToken) {
      fetchMingle(currentToken);
    }
  }, [currentToken]);

  // Récupére l'user de la session
  useEffect(() => {
    if (users) {
      const filteredUser = users.filter((user) => user.id === currentToken);
      setUser(filteredUser[0]);
    }
  }, [users]);

  // Récupére les data des amis du user et définis les conversations liés à ceux-ci
  useEffect(() => {
    if (friends && users && conversations) {
      const { filteredUserFriends, filteredConversation } = filterUserFriends(users, friends, conversations);
      setUserFriends(filteredUserFriends);
      // Mettre à jour les conversations seulement si nécessaire
      if (filteredConversation.length !== conversations.length) {
        setConversations(filteredConversation);
      }
    }
  }, [friends, users, conversations]);
  
  const fetchConversation = (conversationId) => {
    const getConversationByConvId = conversations.filter(
      (conv) => conv.id === conversationId
    );
    return getConversationByConvId;
  };

  return (
    <AuthProvider>
      <ServiceProvider>
        <Router>
          <div className="bgone flex flex-col min-h-screen">
            <Header />
            <AnimatedRoutes />
            {currentToken && (
              <ChatBubble
                user={user}
                users={users}
                friendsTable={friends}
                friends={userFriends}
                conversations={conversations}
                setConversations={setConversations}
                fetchConversation={fetchConversation}
                fetchMingle={fetchMingle}
              />
            )} 
            <Footer />
          </div>
        </Router>
      </ServiceProvider>
    </AuthProvider>
  );
}

export default App;
