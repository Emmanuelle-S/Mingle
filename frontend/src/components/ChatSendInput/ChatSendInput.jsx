// src/components/ChatSendInput/ChatSendInput.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Liste des insultes à filtrer
const PROFANITIES = ['putain', 'merde', 'salope', 'connard', 'bâtard', 'pute', 'bite', 'enculé', 'pédé', 'négro', 'retardé', 'traînée', 'couillon', 'gouine', 'sale arabe']; // Remplacez par des insultes réelles

/**
 * Filtre les insultes d'un message en les remplaçant par des étoiles.
 * @param {string} message - Le message à filtrer.
 * @returns {string} - Le message avec les insultes remplacées par des étoiles.
 */
export function filterProfanity(message) {
  let filteredMessage = message;

  PROFANITIES.forEach(profanity => {
    const regex = new RegExp(`\\b${profanity}\\b`, 'gi'); // Utilise une expression régulière pour trouver le mot offensant
    filteredMessage = filteredMessage.replace(regex, '*'.repeat(profanity.length));
  });

  return filteredMessage;
}

function ChatInput({ conversationId, sender_id, onMessageSent }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = async () => {
    const filteredMessage = filterProfanity(message); // Filtrer les insultes du message

    const messageData = {
      conversation_id: conversationId,
      sender_id: sender_id,
      content: filteredMessage,
      sent_at: new Date().toISOString(),
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/message`, messageData); // Utilisez process.env ici
      // Réinitialiser l'input après l'envoi du message
      setMessage('');
      // Appeler la fonction de rappel pour mettre à jour les messages
      onMessageSent(messageData);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  useEffect(() => {
    // Focus sur l'input lorsque le composant est monté
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex p-8 w-full">
      <input
        type="text"
        className="flex-1 p-2 border text-black rounded-l-md"
        placeholder="Type a message"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <button className="p-2 bg-blue-500 text-white rounded-r-md" onClick={handleSendClick}>
        Send
      </button>
    </div>
  );
}

export default ChatInput;
