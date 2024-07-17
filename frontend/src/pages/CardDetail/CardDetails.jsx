import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from '../../components/Commentaire/Comment';
import { jwtDecode } from "jwt-decode"; // Assurez-vous d'importer jwt-decode

function CardDetail() {
  const [currentToken, setCurrentToken] = useState(null);
  const [card, setCardDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userId, setUserId] = useState(null);

  console.log("c'est le user id", userId);
  console.log("c'est le card", card);
  console.log("c'est le comment", comments);
  console.log("c'est le newcomment", newComment);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.sub) {
          setCurrentToken(decodedToken.sub);
          setUserId(decodedToken.sub); // Définit l'ID utilisateur à partir du token décodé
        } else {
          console.log("Token is missing 'sub' property");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No token found in localStorage");
    }
  }, []);

  const fetchDataDetail = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/service`);
      console.log('Service Data:', response.data);
      if (response.data.length > 0) {
        setCardDetail(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching data', error.message || error);
    }
  };

  const fetchComments = async () => {
    try {
      if (card && card.id) {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/comments/service/${card.id}`);
        console.log('Comments Data:', response.data);
        if (Array.isArray(response.data)) {
          setComments(response.data);
        } else {
          setComments([response.data]); // Traitez un objet unique comme un tableau
        }
      }
    } catch (error) {
      console.error('Error fetching comments', error.message || error);
    }
  };

  const handleAddComment = async () => {
    try {
      console.log('Card ID:', card ? card.id : 'No card');
      console.log('User ID:', userId);

      if (card && card.id && userId) {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/comments`, {
          service_id: card.id,
          user_id: userId, // Utilisez l'ID utilisateur récupéré
          content: newComment,
        });
        setNewComment('');
        fetchComments();
      } else {
        console.error('Service ID or User ID is invalid');
      }
    } catch (error) {
      console.error('Error adding comment', error.message || error);
    }
  };

  const handleUpdateComment = () => {
    fetchComments();
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/comments/${id}`);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment', error.message || error);
    }
  };

  useEffect(() => {
    fetchDataDetail();
  }, []);

  useEffect(() => {
    if (card) {
      fetchComments();
    }
  }, [card]);

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
   <div className="flex justify-center items-center h-56 mt-40">
      <div className="bg-primary shadow-md rounded-lg p-6 m-4 w-full max-w-2xl flex flex-col justify-between h-70">
        <h3 className="text-white text-center h-8">{card.titre}</h3>
        <p className="text-white text-center mb-6">{card.description}</p>
        <div className="flex-grow mt-4">
          <div className="comments-section">
            <h4 className="text-white">Commentaires</h4>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire"
              className="w-full p-2 mt-2 mb-2 border rounded"
            />
            <div className="flex justify-center">
              <button onClick={handleAddComment} className="bg-blue-500 text-white p-2 rounded-md">Soumettre</button>
            </div>
            <div className="mt-4">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onUpdate={handleUpdateComment}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-auto flex justify-center">
          <button className="bg-blue-500 text-center text-white p-2 rounded-md">Contact Batman</button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;