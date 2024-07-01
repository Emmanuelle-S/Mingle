// ChatSendInput.jsx

import React, { useState } from 'react';
import axios from 'axios';

function ChatInput({ conversationId, sender_id, onMessageSent }) {
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = async () => {
    const messageData = {
      conversation_id: conversationId,
      sender_id: sender_id,
      content: message,
      sent_at: new Date().toISOString(),
    };
    try {
      const response = await axios.post('http://localhost:5000/message', messageData);
      console.log(response.data);
      console.log('Message sent successfully:', messageData.content);
      // Réinitialiser l'input après l'envoi du message
      setMessage('');
      // Appeler la fonction de rappel pour mettre à jour les messages
      onMessageSent(messageData);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex p-8 w-full">
      <input
        type="text"
        className="flex-1 p-2 border rounded-l-md"
        placeholder="Type a message"
        value={message}
        onChange={handleInputChange}
      />
      <button className="p-2 bg-blue-500 text-white rounded-r-md" onClick={handleSendClick}>
        Send
      </button>
    </div>
  );
}

export default ChatInput;
