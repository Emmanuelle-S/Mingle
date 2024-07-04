import React, { useState } from 'react';
import Message from './Message';

const ChatBubble = ({ user, users, friendsTable, friends, setFriends, conversations, setConversations, fetchConversation, fetchMingle }) => {
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
      {isOpen && <Message users={users} user={user} friendsTable={friendsTable} friends={friends} setFriends={setFriends} conversations={conversations} setConversations={setConversations} fetchConversation={fetchConversation} fetchMingle={fetchMingle} onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default ChatBubble;
