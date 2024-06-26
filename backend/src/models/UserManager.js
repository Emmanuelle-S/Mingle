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
    const fields = [];
    const values = [];
  
    if (users.username) {
      fields.push("username = ?");
      values.push(users.username);
    }
    if (users.mail) {
      fields.push("mail = ?");
      values.push(users.mail);
    }
    if (users.localisation) {
      fields.push("localisation = ?");
      values.push(users.localisation);
    }
    if (users.user_pass) {
      fields.push("user_pass = ?");
      values.push(users.user_pass);
    }
    if (users.avatar) {
      fields.push("avatar = ?");
      values.push(users.avatar);
    }
    if (users.biographie) {
      fields.push("biographie = ?");
      values.push(users.biographie);
    }
    if (users.service_type) {
      fields.push("service_type = ?");
      values.push(users.service_type);
    }
    if (users.service_count !== undefined) {
      fields.push("service_count = ?");
      values.push(users.service_count);
    }
  
    values.push(users.id);
  
    const sql = `UPDATE ${this.table} SET ${fields.join(", ")} WHERE id = ?`;
  
    return this.database.query(sql, values);
  }
  


findUserByEmail(mail) {
  return this.database.query(`select * from  ${this.table} where mail = ?`, [
    mail,
  ]);
}
}

module.exports = UserManager;