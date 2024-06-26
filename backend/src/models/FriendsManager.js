const AbstractManager = require("./AbstractManager");

class FriendsManager extends AbstractManager {
  constructor() {
    super({ table: "friends" });
  }

  insert(friends) {
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, friend_id) VALUES (?, ?)`,
      [
        friends.user_id,
        friends.friend_id,
      ]
    );
  }

  update(friends) {
    return this.database.query(
      `UPDATE ${this.table} SET user_id = ?, friend_id = ? WHERE id = ?`,
      [
        friends.user_id, 
        friends.friend_id,
        friends.id
      ]
    );
  }
}

module.exports = FriendsManager;
