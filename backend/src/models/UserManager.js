const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(users) {
    return this.database.query(`insert into ${this.table} (username) values (?)`, [
      users.username,
    ]);
  }

  update(users) {
    return this.database.query(
      `update ${this.table} set username = ? where id = ?`,
      [users.username, users.id]
    );
  }
}

module.exports = UserManager;
