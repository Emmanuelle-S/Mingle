import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { ServiceProvider } from "./contexts/ServiceContext";
import "./App.css";
import axios from 'axios';
import Header from "./components/Header/Header.jsx";
import ChatBubble from "./pages/Message/Bubble";
import AnimatedRoutes from './components/AnimatedRoutes/AnimatedRoutes'; // Déplacez AnimatedRoutes dans un fichier séparé
import { jwtDecode } from 'jwt-decode';
import { parseJSON } from 'date-fns';

function App() {
  const [currentToken, setCurrentToken] = useState(null);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  
  const [user, setUser] = useState(null);
  
  const [conversations, setConversations] = useState([]); 
  const [userFriends, setUserFriends] = useState(null);
    


  const fetchMingle = async (userId) => {
    try {
      const responseUsers = await axios.get("http://localhost:5000/users");
      setUsers(responseUsers.data);

      const responseFriends = await axios.get("http://localhost:5000/friends");
      const filteredFriends = await responseFriends.data.filter(friend => friend.user_id === userId);
      setFriends(filteredFriends);

      const responseConversation = await axios.get("http://localhost:5000/conversation");
      const filteredConversation = await responseConversation.data.filter(conversation => (conversation.user_id === userId) || (conversation.friend_id === userId));
      setConversations(filteredConversation);
    } 
    catch (error) {
      console.error("Error fetching data", error);
    }
  };


  // Recupére l'id dans le payload via jwt-decode 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.sub) {
          setCurrentToken(decodedToken.sub);
        } else {
          console.log("Token is missing 'sub' property");
        }
      } catch (error) {
        console.error('Error decoding token:', error);
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
      const filteredUser = users.filter(user => user.id === currentToken);
      setUser(filteredUser[0]);
    }
  }, [users])

  // Récupére les data des amis du user et définis les conversations liés à ceux-ci
  useEffect(() => {
    if (friends) {
      const parseFriends = friends[0]?.friends ? JSON.parse(friends[0]?.friends) : [];
      const filteredUserFriends = parseFriends.map(friendId => 
        users.find(user => user.id === friendId)
      ).filter(user => user !== undefined);      // Ajout de la logique de filtre des conversations ici
      const filteredConversation = friends.map(friend => {
        const conversation = conversations.filter(conversation => conversation.friend_id === friend.friends);
        return {conversation};
      }); // Ajout de la logique de filtre de conversation ici
      setUserFriends(filteredUserFriends);
      setConversations(filteredConversation);
    }
  }, [friends])


  const fetchConversation = (conversationId) => {
    const getConversationByConvId = conversations.filter(conv => conv.id === conversationId);
    return getConversationByConvId;
  };

  return (
    <AuthProvider>
      <ServiceProvider>
        <Router>
      <div className='bgone flex flex-col min-h-screen' >
          <Header />
          <AnimatedRoutes />
          <ChatBubble
                user={user}
                users={users}
                friendsTable={friends}
                friends={userFriends}
                setFriends={setUserFriends}
                conversations={conversations}
                setConversations={setConversations}
                fetchConversation={fetchConversation}
              />
          
              </div>
        </Router>
      </ServiceProvider>
    </AuthProvider>
  );
}

export default App;