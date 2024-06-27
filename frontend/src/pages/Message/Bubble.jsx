import React, { useState } from 'react';
import Message from './Message';

const ChatBubble = ({ user, friends, conversations, fetchConversation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}
      {isOpen && <Message user={user} friends={friends} conversations={conversations} fetchConversation={fetchConversation} onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default ChatBubble;
