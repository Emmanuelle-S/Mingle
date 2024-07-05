const AbstractManager = require("./AbstractManager");

class ServiceManager extends AbstractManager {
    constructor() {
        super({ table: "services" });
    }

    insert(services) {
        return this.database.query(
            `insert into ${this.table} (titre, description, illustration, user_id) values (?, ?, ?, ?)`, 
            [services.titre, services.description, services.illustration || null, services.user_id]
        );
    }

    update(services) {
        return this.database.query(
            `update ${this.table} set titre = ?, description = ?, illustration = ?, user_id = ? = ? where id = ?`,
            [services.titre, services.description, services.illustration, services.user_id, services.id]
        );
    }

getServicesByCategoryId(id) {
    return this.database.query(`
      SELECT s.* 
      FROM emmanuelle_mingle.category_service c 
      JOIN emmanuelle_mingle.service_type st ON c.id = st.catégorie_id 
      JOIN emmanuelle_mingle.services s ON st.service_id = s.id 
      WHERE c.id = ?`, 
      [id]
    );
  }

}

module.exports = ServiceManager;
