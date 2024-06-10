const AbstractManager = require("./AbstractManager");

class MessageManager extends AbstractManager {
  constructor() {
    super({ table: "messages" });
  }

  insert(messages) {
    return this.database.query(`insert into ${this.table} (objet, message, date_heure, user_id) values (?,?,?,?)`, [
      messages.objet,
      messages.message,
      messages.date_heure,
      messages.user_id,
  
    ]);
  }

  update(messages) {
    return this.database.query(
      `update ${this.table} set objet = ?, message = ?, date_heure = ?, user_id = ?,`,
      [
        messages.objet, 
        messages.messages, 
        messages.date_heure, 
        messages.user_id
      ]
  )}
}

module.exports = MessageManager;