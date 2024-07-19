import React, { useState } from 'react';
import axios from 'axios';

const Comment = ({ comment, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const handleUpdate = async () => {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/comments/${comment.id}`, { content });
    setIsEditing(false);
    onUpdate();
  };

  return (
    <div className="border p-4 rounded mb-4 bg-white shadow-lg">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-gray-800">{comment.content}</p>
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary p-2  text-white px-4 py-2 rounded-md mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              className="border border-black rounded-lg p-2"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
