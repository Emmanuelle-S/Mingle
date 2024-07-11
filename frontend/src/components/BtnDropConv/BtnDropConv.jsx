import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

const DeleteButton = ({ user, selectedConversation, fetchMingle, setSelectedConversation }) => {
    const [dropOpen, setDropOpen] = useState(false);
    
    const handleDelete = async () => {
        if (!selectedConversation) {
            console.error("No conversation selected");
            return;
        }

        try {
            // Appel à l'API pour supprimer la conversation
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/conversation/${selectedConversation.id}`);
            // Rafraîchir la liste des conversations après la suppression
            fetchMingle(user.id); // Si vous avez une fonction pour rafraîchir les données
            setSelectedConversation(null); // Réinitialiser la conversation sélectionnée
        } catch (error) {
            console.error("Erreur lors de la suppression de la conversation:", error);
        }
    };

    return (
        <div className='absolute left-4 md:left-8'>
            {!dropOpen ? (
                <button
                    className='bg-red-500 text-white py-1 px-2 md:py-2 md:px-4 rounded hover:bg-red-600 transition duration-300'
                    onClick={() => setDropOpen(true)}
                >
                    <TrashIcon className="h-3 w-3 md:h-5 md:w-5" />
                </button>
            ) : (
                <div>
                    <button
                        onClick={handleDelete}
                        className="text-xs bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                    >
                        Supprimer
                    </button>
                    <button
                        onClick={() => setDropOpen(false)}
                        className="text-xs text-white py-2 px-4"
                    >
                        🔙
                    </button>
                </div>
            )}
        </div>
    );
};

export default DeleteButton;
