function filterUserFriends(users, friends, conversations) {
    // Vérifie si 'friends' est défini, non vide et si le premier élément a une propriété 'friends'
    // Si c'est le cas, analyse la chaîne JSON en tableau, sinon utilise un tableau vide
    const parseFriends = friends && friends.length > 0 && friends[0]?.friends ? JSON.parse(friends[0]?.friends) : [];
    
    // Filtre les utilisateurs pour ne garder que ceux qui ont un ID correspondant aux ID des amis
    const filteredUserFriends = parseFriends
        .map((friendId) => users.find((user) => user.id === friendId))
        .filter((user) => user !== undefined); // Filtre les valeurs undefined (amis non trouvés)

    // Crée une liste des ID d'amis en tant que nombres
    const friendIds = parseFriends.map(Number);
    
    // Pour chaque ID d'ami, filtre les conversations pour ne garder que celles qui correspondent à l'ID de l'ami
    const filteredConversation = friendIds.map((friendId) => {
        const conversation = conversations.filter(
            (conversation) => conversation.friend_id === friendId
        );
        return { conversation }; // Retourne un objet avec la conversation filtrée
    });

    // Retourne les amis filtrés et les conversations filtrées
    return { filteredUserFriends, filteredConversation };
}

export default filterUserFriends;