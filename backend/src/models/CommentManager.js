const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comments" });
  }

  insert(comment) {
    return this.database.query(
      `INSERT INTO ${this.table} (service_id, user_id, content) VALUES (?, ?, ?)`,
      [comment.service_id, comment.user_id, comment.content],
      console.log(comment.service_id)
    );
  }

  update(comment) {
    return this.database.query(
      `UPDATE ${this.table} SET content = ? WHERE id = ?`,
      [comment.content, comment.id]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }

  findByServiceId(service_id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE service_id = ?`, [service_id]);
  }

  findByServiceId(service_id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE service_id = ?`, [service_id]);
  }

  findCommentByServiceId(service_id){

    return this.database.query(`SELECT * FROM ${this.table} WHERE service_id = ?`, [service_id]);
  }
}



module.exports = CommentManager;


