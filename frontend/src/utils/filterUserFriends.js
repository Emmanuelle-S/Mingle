function filterUserFriends(users, friends, conversations) {
    // Assure que friends est défini et qu'il y a au moins un élément
    const parseFriends = friends && friends.length > 0 && friends[0]?.friends ? JSON.parse(friends[0]?.friends) : [];
    
    const filteredUserFriends = parseFriends
        .map((friendId) => users.find((user) => user.id === friendId))
        .filter((user) => user !== undefined);

    const filteredConversation = friends.map((friend) => {
        const conversation = conversations.filter(
            (conversation) => conversation.friend_id === friend.friends
        );
        return { conversation };
    });

    return { filteredUserFriends, filteredConversation };
}

export default filterUserFriends;