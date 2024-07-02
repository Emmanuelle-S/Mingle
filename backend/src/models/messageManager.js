const AbstractManager = require("./AbstractManager");

class MessageManager extends AbstractManager {
  constructor() {
    super({ table: "messages" });
  }

  insert(messages) {
    return this.database.query(`insert into ${this.table} (conversation_id, sender_id, content, sent_at) values (?,?,?,NOW())`, [
      messages.conversation_id,
      messages.sender_id,
      messages.content,
      messages.sent_at,
    ]);
  }

  update(messages) {
    return this.database.query(
      `update ${this.table} set objet = ?, message = ?, date_heure = ?, user_id = ? where id = ?`,
      [
        messages.objet, 
        messages.message, 
        messages.date_heure, 
        messages.user_id,
        messages.id
      ]
  )}
}

module.exports = MessageManager;