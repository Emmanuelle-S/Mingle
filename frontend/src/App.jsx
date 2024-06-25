import React from 'react';
import Home from './pages/Home/Home';
import Profil from '@pages/Profil/Profil';
import { ServiceProvider } from "./contexts/ServiceContext";
import Publier from "@pages/Publier/Publier.jsx";
import ChatBubble from './pages/Message/Bubble';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound/NotFound.jsx';
import Formulaire from './components/Formulaire/Formulaire.jsx'
import Header from './components/Header/Header.jsx';
import FAQ from '@pages/FAQ/FAQ';
import ConnexionInscritpion from '@pages/ConnexionInscription/ConnexionInscription';
import ConditionsUtilisation from '@pages/ConditionsUtilisation/ConditionsUtilisation';
import PolitiqueDeConfidentialité from '@pages/PolitiqueDeConfidentialité/PolitiqueDeConfidentialité';
import EditProfil from '@components/Profil/EditProfil';
import About from "./pages/About/About.jsx"
import Dashboard from '@pages/Dashboardservice/Dashboardservice';


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
    // Simule la récupération des messages d'une conversation
    return [
      { text: 'Hello!', isMine: false },
      { text: 'Hi!', isMine: true },
      { text: 'How are you?', isMine: false },
    ];
  };

  return (
    <>
      <ServiceProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
          
            <main className="flex-grow bgone">
              <Header/>
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/Profil" element={<Profil/>} />
                <Route path="/EditProfil" element={<EditProfil/>} />
                <Route path="/formulaire" element={<Formulaire/>} />
                <Route path="/publier" element={<Publier/>} />
                <Route path="/ConnexionInscription" element={<ConnexionInscritpion/>} />
                <Route path="/FAQ" element={<FAQ />} />
                <Route path="/conditions" element={<ConditionsUtilisation />} />
                <Route path="/politique" element={<PolitiqueDeConfidentialité />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
        
              </Routes>
              <ChatBubble friends={friends} conversations={conversations} fetchConversation={fetchConversation} />
            </main>
            {/* <Footer /> */}
          </div>
        </Router>
      </ServiceProvider>
    </>
  );
}

export default App;
