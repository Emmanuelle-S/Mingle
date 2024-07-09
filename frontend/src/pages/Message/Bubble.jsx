import React, { useState, useEffect } from 'react';
import Message from './Message';

const ChatBubble = ({ user, users, friendsTable, friends, setFriends, conversations, setConversations, fetchConversation, fetchMingle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed bottom-2 right-4 md:bottom-32 md:right-12 z-[60]`}>
      {!isOpen && (
        <button
          className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}
      {isOpen && <Message users={users} user={user} friendsTable={friendsTable} friends={friends} conversations={conversations} setConversations={setConversations} fetchConversation={fetchConversation} fetchMingle={fetchMingle} onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default ChatBubble;
