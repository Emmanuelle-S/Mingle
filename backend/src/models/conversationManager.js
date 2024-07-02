// TODO this

const AbstractManager = require("./AbstractManager");

class ConversationManager extends AbstractManager {
  constructor() {
    super({ table: "conversations" });
  }

  insert(conversations) {
    // Assurez-vous que 'messages' est encodé en JSON, même s'il est vide
    const messages = JSON.stringify(conversations.messages || []);
    
    return this.database.query(
      `INSERT INTO ${this.table} (name, avatar, last_message, last_message_time, friend_id, user_id, messages) VALUES (?, ?, ?, NOW(), ?, ?, ?)`,
      [
        conversations.name,
        conversations.avatar,
        conversations.last_message,
        conversations.friend_id,
        conversations.user_id,
        messages,  // Encodez les messages en JSON
      ]
    );
  }
}

module.exports = ConversationManager;