const filterUserFriends = require('./filterUserFriends');

describe('filterUserFriends', () => {
    it('should filter user friends correctly', () => {
        const users = [
        { id: 1, username: 'Alice' },
        { id: 2, username: 'Bob' },
        { id: 3, username: 'Charlie' }
        ];
        const friends = [{ friends: JSON.stringify([1, 3]) }];
        const conversations = [
        { friend_id: 1, message: 'Hello Alice' },
        { friend_id: 2, message: 'Hello Bob' },
        { friend_id: 3, message: 'Hello Charlie' }
        ];
        const result = filterUserFriends(users, friends, conversations);

        expect(result.filteredUserFriends).toEqual([
        { id: 1, username: 'Alice' },
        { id: 3, username: 'Charlie' }
        ]);
        expect(result.filteredConversation).toEqual([
        { conversation: [{ friend_id: 1, message: 'Hello Alice' }] },
        { conversation: [{ friend_id: 3, message: 'Hello Charlie' }] }
        ]);
    });

    it('should return empty arrays if friends list is empty', () => {
        const users = [
        { id: 1, username: 'Alice' },
        { id: 2, username: 'Bob' },
        { id: 3, username: 'Charlie' }
        ];
        const friends = [{}];
        const conversations = [
        { friend_id: 1, message: 'Hello Alice' },
        { friend_id: 2, message: 'Hello Bob' },
        { friend_id: 3, message: 'Hello Charlie' }
        ];
        const result = filterUserFriends(users, friends, conversations);

        expect(result.filteredUserFriends).toEqual([]);
        expect(result.filteredConversation).toEqual([ { conversation: [] } ]);
    });

    it('should filter conversations correctly even if some friends are not found', () => {
        const users = [
        { id: 1, username: 'Alice' },
        { id: 3, username: 'Charlie' }
        ];
        const friends = [{ friends: JSON.stringify([1, 2, 3]) }];
        const conversations = [
        { friend_id: 1, message: 'Hello Alice' },
        { friend_id: 2, message: 'Hello Bob' },
        { friend_id: 3, message: 'Hello Charlie' }
        ];
        const result = filterUserFriends(users, friends, conversations);

        expect(result.filteredUserFriends).toEqual([
        { id: 1, username: 'Alice' },
        { id: 3, username: 'Charlie' }
        ]);
        expect(result.filteredConversation).toEqual([
        { conversation: [{ friend_id: 1, message: 'Hello Alice' }] },
        { conversation: [{ friend_id: 3, message: 'Hello Charlie' }] }
        ]);
    });
});