const AbstractManager = require("./AbstractManager");

class FriendsManager extends AbstractManager {
  constructor() {
    super({ table: "friends" });
  }

  insert(friends) {
    const friendsJson = JSON.stringify(friends.friends || []);
    console.log('Insert friends:', friends); // Ajoutez ce log

    return this.database.query(
      `INSERT INTO ${this.table} (user_id, friends) VALUES (?, ?)`,
      [
        friends.user_id,
        friendsJson, // Encodage des amis en JSON
      ]
    );
  }

  update(friends) {
    const friendsJson = JSON.stringify(friends.friends || []);
    console.log('Update friends:', friends); // Ajoutez ce log
    console.log('Friends JSON:', friendsJson); // Ajoutez ce log

    return this.database.query(
      `UPDATE ${this.table} SET friends = ? WHERE id = ?`,
      [
        friendsJson, // Encodage des amis en JSON
        friends.id
      ]
    );
  }
}

module.exports = FriendsManager;
