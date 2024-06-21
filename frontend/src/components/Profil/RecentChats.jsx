import React from 'react';

const RecentChats = ({ chats }) => {
  return (
    <div className="space-y-4">
      {chats.map(chat => (
        <div key={chat.id} className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold text-darkslategray mb-2">{chat.user}</h3>
          <p className="text-sm text-gray-600">{chat.message}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentChats;
