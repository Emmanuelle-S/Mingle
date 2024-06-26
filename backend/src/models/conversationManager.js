// TODO this

const AbstractManager = require("./AbstractManager");

class ConversationManager extends AbstractManager {
  constructor() {
    super({ table: "conversations" });
  }

  insert(conversations) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, avatar, last_message, last_message_time) VALUES (?, ?, ?, ?)`,
      [
        conversations.name,
        conversations.avatar,
        conversations.last_message,
        conversations.last_message_time,
      ]
    );
  }
}

module.exports = ConversationManager;
