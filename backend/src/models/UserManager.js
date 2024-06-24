const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // méthode qui initialise les  valeurs de la propriété instanciée
    super({ table: "users" });
    // sert à faire un héritage en appelant le construct parent abstract manager
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


findUserByEmail(mail) {
  return this.database.query(`select * from  ${this.table} where mail = ?`, [
    mail,
  ]);
}
}

module.exports = UserManager;