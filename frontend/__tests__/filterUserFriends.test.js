import filterUserFriends from '../src/utils/filterUserFriends';

test('should filter user friends correctly', () => {
    // Définition des utilisateurs
    const users = [
        { id: 1, username: 'Alice' },
        { id: 2, username: 'Bob' },
        { id: 3, username: 'Charlie' },
    ];
    // Définition des amis (ID des amis encapsulés dans une chaîne JSON)
    const friends = [
        { friends: JSON.stringify([1, 3]) }
    ];
    // Définition des conversations
    const conversations = [
        { friend_id: 1, message: 'Hello Alice' },
        { friend_id: 3, message: 'Hello Charlie' },
    ];
    // Appel de la fonction pour filtrer les amis et les conversations
    const result = filterUserFriends(users, friends, conversations);

    // Vérification que les amis filtrés correspondent à l'attendu
    expect(result.filteredUserFriends).toEqual([
        { id: 1, username: 'Alice' },
        { id: 3, username: 'Charlie' }
    ]);
    // Vérification que les conversations filtrées correspondent à l'attendu
    expect(result.filteredConversation).toEqual([
        { conversation: [{ friend_id: 1, message: 'Hello Alice' }] },
        { conversation: [{ friend_id: 3, message: 'Hello Charlie' }] }
    ]);
});

test('should return empty arrays if friends list is empty', () => {
    // Définition des utilisateurs
    const users = [
        { id: 1, username: 'Alice' },
        { id: 2, username: 'Bob' },
        { id: 3, username: 'Charlie' },
    ];
    // Liste des amis vide
    const friends = [];
    // Définition des conversations
    const conversations = [
        { friend_id: 1, message: 'Hello Alice' },
        { friend_id: 3, message: 'Hello Charlie' },
    ];
    // Appel de la fonction avec une liste d'amis vide
    const result = filterUserFriends(users, friends, conversations);
    // Vérifie que les listes retournées sont vides
    expect(result.filteredUserFriends).toEqual([]);
    expect(result.filteredConversation).toEqual([]);
});

test('should filter conversations correctly even if some friends are not found', () => {
    // Définition des utilisateurs
    const users = [
        { id: 1, username: 'Alice' },
        { id: 2, username: 'Bob' },
        { id: 3, username: 'Charlie' },
    ];
    // Définition des amis (ID des amis encapsulés dans une chaîne JSON)
    const friends = [
        { friends: JSON.stringify([1, 3]) }
    ];
    // Définition des conversations
    const conversations = [
        { friend_id: 1, message: 'Hello Alice' },
        { friend_id: 3, message: 'Hello Charlie' },
        { friend_id: 4, message: 'Hello Unknown' }, // This conversation should be ignored
    ];
    // Appel de la fonction pour filtrer les amis et les conversations
    const result = filterUserFriends(users, friends, conversations);

    // Vérifie que les amis filtrés correspondent à l'attendu
    expect(result.filteredUserFriends).toEqual([
        { id: 1, username: 'Alice' },
        { id: 3, username: 'Charlie' }
    ]);
    // Vérifie que les conversations filtrées correspondent à l'attendu
    expect(result.filteredConversation).toEqual([
        { conversation: [{ friend_id: 1, message: 'Hello Alice' }] },
        { conversation: [{ friend_id: 3, message: 'Hello Charlie' }] }
    ]);
});
