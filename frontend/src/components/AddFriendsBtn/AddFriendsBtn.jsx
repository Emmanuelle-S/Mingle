import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assurez-vous d'avoir axios installé

function AddFriendsBtn({ user, friendId, friends, friendsTable, fetchMingle }) {
    const [valid, setValid] = useState(true)

    useEffect(() => {
        const isFriend = friends.some(friend => friend.id === friendId);
        setValid(!isFriend);
    }, [])

    useEffect(() => {
        if (friendId === user.id) {
            setValid(false);
        };
    }, [])
    
    const addFriend = async () => {
        try {
            let currentFriends = [];
    
            // Vérifier si friendsTable existe et contient des amis
            if (friendsTable.length > 0 && friendsTable[0].friends) {
                currentFriends = JSON.parse(friendsTable[0].friends);
            }
    
            // Ajouter le nouvel ami à la liste
            if (!currentFriends.includes(friendId)) {
                const updatedFriends = [...currentFriends, friendId];
    
                let response;
                if (friendsTable.length > 0) {
                    // Mettre à jour la base de données
                    response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/friends/${friendsTable[0].id}`, {
                        user_id: user.id,
                        friends: updatedFriends // Assurez-vous que ceci est un tableau et non une chaîne JSON
                    });
                } else {
                    // Créer une nouvelle entrée dans la base de données
                    response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/friends`, {
                        user_id: user.id,
                        friends: updatedFriends // Assurez-vous que ceci est un tableau et non une chaîne JSON
                    });
                }
    
                if (response.status === 204 || response.status === 201) {
                    // Mettre à jour l'état des amis seulement si la mise à jour est réussie
                    fetchMingle(user.id);
                    setValid(false);
                } else {
                    console.error('Erreur inattendue lors de la mise à jour de la base de données:', response);
                }
            } else {
                console.log("Cet utilisateur est déjà dans votre liste d'amis.");
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'ami:', error);
        }
    };

    return (
        <>
            {valid && (
                <button
                    onClick={addFriend}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    Ajouter en ami
                </button>
            )}
        </>
    );
}

export default AddFriendsBtn;
