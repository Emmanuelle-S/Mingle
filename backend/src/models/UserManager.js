const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(users) {
    return this.database.query(`insert into ${this.table} (username, mail, localisation, user_pass, avatar, biographie, service_type, service_count) values (?,?,?,?,?,?,?,?)`, [
      users.username,
      users.mail,
      users.localisation,
      users.user_pass,
      users.avatar,
      users.biographie,
      users.service_type,
      users.service_count
    ]);
  }

  update(users) {
    return this.database.query(
      `update ${this.table} set username = ?, mail = ?, localisation = ?, user_pass = ?, avatar = ?, biographie = ?, service_type = ?, service_count = ? where id = ?`,
      [
        users.username, 
        users.mail, 
        users.localisation, 
        users.user_pass, 
        users.avatar, 
        users.biographie, 
        users.service_type, 
        users.service_count, 
        users.id
      ]
    );
  }
}

module.exports = UserManager;