import React from 'react';
import Home from './pages/Home/Home';
import ChatBubble from './pages/Message/Bubble';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  // const friends = [];
  // const conversations = [];

  // const fetchConversation = async (conversationId) => {
  //   return [];
  // };

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
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/message" element={<Messenger friends={friends} conversations={conversations} fetchConversation={fetchConversation}/>} /> */}
          </Routes>
          <ChatBubble friends={friends} conversations={conversations} fetchConversation={fetchConversation} />
        </main>
      </div>
    </Router>
  );
}

export default App;
