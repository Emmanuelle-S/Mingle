const AbstractManager = require("./AbstractManager");

class ConversationManager extends AbstractManager {
  constructor() {
    super({ table: "conversations" });
  }

  insert(conversations) {
    const messages = JSON.stringify(conversations.messages || []);
    
    return this.database.query(
      `INSERT INTO ${this.table} (name, avatar, last_message, last_message_time, friend_id, user_id, messages) VALUES (?, ?, ?, NOW(), ?, ?, ?)`,
      [
        conversations.name,
        conversations.avatar,
        conversations.last_message,
        conversations.friend_id,
        conversations.user_id,
        messages, // Encodage des messages en JSON
      ]
    );
  }

  update(conversations) {
    const messages = JSON.stringify(conversations.messages || []);
    
    return this.database.query(
      `UPDATE ${this.table} SET last_message = ?, last_message_time = NOW(), messages = ? WHERE id = ?`,
      [
        conversations.last_message,
        messages, // Encodage des messages en JSON
        conversations.id
      ]
    );
  }
}

module.exports = ConversationManager;
