// TODO this

const AbstractManager = require("./AbstractManager");

class ConversationManager extends AbstractManager {
  constructor() {
    super({ table: "conversations" });
  }

  insert(conversations) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, avatar, last_message, last_message_time, friend_id, user_id, messages) VALUES (?, ?, ?, NOW(), ?, ?, ?)`,
      [
        conversations.name,
        conversations.avatar,
        conversations.last_message,
        conversations.friend_id,
        conversations.user_id,
        conversations.messages,
      ]
    );
  }
}

module.exports = ConversationManager;
