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
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <p>{comment.content}</p>
      )}
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDelete(comment.id)}>Delete</button>
    </div>
  );
};

export default Comment;
