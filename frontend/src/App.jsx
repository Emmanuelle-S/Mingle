import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { ServiceProvider } from "./contexts/ServiceContext";
import "./App.css";
import axios from 'axios';
import Header from "./components/Header/Header.jsx";
import ChatBubble from "./pages/Message/Bubble";
import AnimatedRoutes from './components/AnimatedRoutes/AnimatedRoutes'; // Déplacez AnimatedRoutes dans un fichier séparé

function App() {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [currentToken, setCurrentToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userFriends, setUserFriends] = useState(null);
  const [conversation, setConversation] = useState([]); // TODO Rajouter un "s" afin de remplacer la constante de testing 

  const fetchMingle = async (userId) => {
    try {
      const responseUsers = await axios.get("http://localhost:5000/users");
      setUsers(responseUsers.data);

      const responseFriends = await axios.get("http://localhost:5000/friends");
      const filteredFriends = responseFriends.data.filter(friend => friend.user_id === userId);
      setFriends(filteredFriends);

      const responseConversation = await axios.get("http://localhost:5000/conversation");
      const filteredConversation = responseConversation.data.filter(conversation => conversation.user_id === userId);
      setConversation(filteredConversation);
      console.log(filteredConversation);

      const responseMessage = await axios.get("http://localhost:5000/message");
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

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

  useEffect(() => {
    if (currentToken) {
      fetchMingle(currentToken);
    }
  }, [currentToken]);

  useEffect(() => {
    if (users) {
      const filteredUser = users.filter(user => user.id === currentToken);
      setUser(filteredUser[0]);
    }
  }, [users]);

  useEffect(() => {
    if (friends) {
      const filteredUserFriends = friends.map(friend => {
        const user = users.find(user => user.id === friend.friend_id);
        return { user };
      });
      setUserFriends(filteredUserFriends);
      console.log(filteredUserFriends);
    }
  }, [friends]);

  const conversations = [
    {
      id: 1,
      name: "Alice",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      lastMessage: "Hi there!",
      lastMessageTime: "2 min ago",
    },
    {
      id: 2,
      name: "Bob",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      lastMessage: "Hello!",
      lastMessageTime: "5 min ago",
    },
    // Ajoutez d'autres conversations
  ];

  const fetchConversation = async (conversationId) => {
    return [
      { text: "Hello!", isMine: false },
      { text: "Hi!", isMine: true },
      { text: "How are you?", isMine: false },
    ];
  };

  return (
    <AuthProvider>
      <ServiceProvider>
        <Router>
      <div className='bgone flex flex-col min-h-screen' >
          <Header />
          <AnimatedRoutes />

          
            <ChatBubble
              friends={friends}
              conversations={conversations}
              fetchConversation={fetchConversation}
              />
          
              </div>
        </Router>
      </ServiceProvider>
    </AuthProvider>
  );
}

export default App;
