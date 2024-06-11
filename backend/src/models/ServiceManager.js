const AbstractManager = require("./AbstractManager");

class ServiceManager extends AbstractManager {
  constructor() {
    super({ table: "services" });
  }

  insert(services) {
    return this.database.query(
      `INSERT INTO ${this.table} (titre, description, illustration, date, user_id, message_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        services.titre,
        services.description,
        services.illustration,
        services.date,
        services.user_id,
        services.message_id
      ]
    );
  }

  update(services) {
    return this.database.query(
      `UPDATE ${this.table} SET titre = ?, description = ?, illustration = ?, date = ?, user_id = ?, message_id = ? WHERE id = ?`,
      [
        services.titre,
        services.description,
        services.illustration,
        services.date,
        services.user_id,
        services.message_id,
        services.id
      ]
    );
  }
}

module.exports = ServiceManager;
