import React from 'react';
import Home from './pages/Home/Home';
import Profil from './pages/Profil/Profil';
import { ServiceProvider } from "./contexts/ServiceContext";
import Publier from "./pages/Publier/Publier.jsx";
import ChatBubble from './pages/Message/Bubble';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound/NotFound.jsx';
import Formulaire from './components/Formulaire/Formulaire.jsx';
import Header from './components/Header/Header.jsx';
import FAQ from './pages/FAQ/FAQ';
import ConnexionInscription from './pages/ConnexionInscription/ConnexionInscription';
import ConditionsUtilisation from './pages/ConditionsUtilisation/ConditionsUtilisation';
import PolitiqueDeConfidentialité from './pages/PolitiqueDeConfidentialité/PolitiqueDeConfidentialité';
import EditProfil from './components/Profil/EditProfil';
import About from "./pages/About/About.jsx";
import Card from './components/Liste de service/card'; 


function App() {
  const friends = [
    { id: 1, name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 2, name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    // Ajoutez d'autres amis
  ];

  const conversations = [
    {
      id: 1,
      name: 'Alice',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      lastMessage: 'Hi there!',
      lastMessageTime: '2 min ago',
    },
    {
      id: 2,
      name: 'Bob',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      lastMessage: 'Hello!',
      lastMessageTime: '5 min ago',
    },
    // Ajoutez d'autres conversations
  ];

  const fetchConversation = async (conversationId) => {
    return [
      { text: 'Hello!', isMine: false },
      { text: 'Hi!', isMine: true },
      { text: 'How are you?', isMine: false },
    ];
  };

  const cards = [
    {
      title: 'Card 1',
      imageUrl: 'https://via.placeholder.com/150',
      category: 'Category 1',
      description: 'Description 1',
      date: '2023-01-01'
    },
    {
      title: 'Card 2',
      imageUrl: 'https://via.placeholder.com/150',
      category: 'Category 2',
      description: 'Description 2',
      date: '2023-01-02'
    },
    // Ajoutez d'autres cartes ici
  ];

  return (
    <ServiceProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow bgone">
          <Header /> {/* Assurez-vous que le Header est en dehors de la balise <main> pour conserver sa couleur */}
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/Profil" element={<Profil />} />
              <Route path="/EditProfil" element={<EditProfil />} />
              <Route path="/formulaire" element={<Formulaire />} />
              <Route path="/publier" element={<Publier />} />
              <Route path="/ConnexionInscription" element={<ConnexionInscription />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/conditions" element={<ConditionsUtilisation />} />
              <Route path="/politique" element={<PolitiqueDeConfidentialité />} />
              <Route path="/about" element={<About />} />
              <Route path="/listeService" element={<Card/>} /> 
            </Routes>
            <ChatBubble friends={friends} conversations={conversations} fetchConversation={fetchConversation} />
          </main>
          {/* <Footer /> */}
        </div>
      </Router>
    </ServiceProvider>
  );
}

export default App;
