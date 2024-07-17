// ChatSendInput.jsx

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { noInjuries } from '@services/noInjuries';

function ChatInput({ conversationId, sender_id, onMessageSent }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);


  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = async () => {
    const filteredMessage = noInjuries(message)

    const messageData = {
      conversation_id: conversationId,
      sender_id: sender_id,
      content: filteredMessage,
      sent_at: new Date().toISOString(),
    };
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/message`, messageData);
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
