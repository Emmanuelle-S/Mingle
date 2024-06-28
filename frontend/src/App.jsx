import React, { useState, useEffect } from 'react';
import Home from './pages/Home/Home';
import Profil from './pages/Profil/Profil';
import { ServiceProvider } from "./contexts/ServiceContext";
import Publier from "./pages/Publier/Publier.jsx";
import ChatBubble from "./pages/Message/Bubble";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Formulaire from "./components/Formulaire/Formulaire.jsx";
import Header from "./components/Header/Header.jsx";
import FAQ from "./pages/FAQ/FAQ";
import ConnexionInscription from "./pages/ConnexionInscription/ConnexionInscription";
import ConditionsUtilisation from "./pages/ConditionsUtilisation/ConditionsUtilisation";
import PolitiqueDeConfidentialité from "./pages/PolitiqueDeConfidentialité/PolitiqueDeConfidentialité";
import EditProfil from "./components/Profil/EditProfil";
import About from "./pages/About/About.jsx";
import Card from './components/Listedeservice/ListeService'; 
import Dashboard from '@pages/Dashboardservice/Dashboardservice';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Service from "./pages/Service/Service.jsx"
import Logout from './components/Logout/Logout';




function App() {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  const [currentToken, setCurrentToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userFriends, setUserFriends] = useState(null);
  
  const [conversation, setConversation] = useState([]); // TODO Rajouter un "s" afin de remplacer la constante de testing 

  // Nouveau code a faire fonctionner
  const fetchMingle = async (userId) => {
    try {
      const responseUsers = await axios.get("http://localhost:5000/users");
      setUsers(responseUsers.data)

      const responseFriends = await axios.get("http://localhost:5000/friends");
      const filteredFriends = await responseFriends.data.filter(friend => friend.user_id === userId);
      setFriends(filteredFriends);

      const responseConversation = await axios.get("http://localhost:5000/conversation");
      const filteredConversation = await responseConversation.data.filter(conversation => conversation.user_id === userId);
      setConversation(filteredConversation);
      console.log(filteredConversation);


      const responseMessage = await axios.get("http://localhost:5000/message");

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

  // Récupére les data des amis du user
  useEffect(() => {
    if (friends) {
      const filteredUserFriends = friends.map(friend => {
        const user = users.find(user => user.id === friend.friend_id);
        return { user };
      });
      setUserFriends(filteredUserFriends);
      console.log(filteredUserFriends);
    }
  }, [friends])


  // Ancien code pour phase de test

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

  // TODO A supprimer 
  const cards = [
    {
      title: "Card 1",
      imageUrl: "https://via.placeholder.com/150",
      category: "Category 1",
      description: "Description 1",
      date: "2023-01-01",
    },
    {
      title: "Card 2",
      imageUrl: "https://via.placeholder.com/150",
      category: "Category 2",
      description: "Description 2",
      date: "2023-01-02",
    },
    // Ajoutez d'autres cartes ici
  ];

  // Fin du code pour tester

  return (
    <AuthProvider>
      <ServiceProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow bgone">
              <Header />{" "}
              {/* Assurez-vous que le Header est en dehors de la balise <main> pour conserver sa couleur */}
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/Profil" element={<Profil />} />
                <Route path="/EditProfil" element={<EditProfil />} />
                <Route path="/formulaire" element={<Formulaire />} />
                <Route path="/publier" element={<Publier />} />
                <Route
                  path="/ConnexionInscription"
                  element={<ConnexionInscription />}
                />
                <Route path="/FAQ" element={<FAQ />} />
                <Route path="/conditions" element={<ConditionsUtilisation />} />
                <Route
                  path="/politique"
                  element={<PolitiqueDeConfidentialité />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/listeService" element={<Card />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/service" element={<Service />} />
                <Route path="/Logout" element={<Logout />} />
              </Routes>
              <ChatBubble
                friends={friends}
                conversations={conversations}
                fetchConversation={fetchConversation}
              />
            </main>
            {/* <Footer /> */}
          </div>
        </Router>
      </ServiceProvider>
    </AuthProvider>
  );
}

export default App;
