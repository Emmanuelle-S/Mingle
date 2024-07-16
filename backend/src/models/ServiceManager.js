const AbstractManager = require("./AbstractManager");

class ServiceManager extends AbstractManager {
    constructor() {
        super({ table: "services" });
    }

    insert(service) {
        return this.database.query(
            `insert into ${this.table} (titre, description, illustration, user_id) values (?, ?, ?, ?)`, 
            [service.titre, service.description, service.illustration || null, service.user_id]
        );
    }

    update(service) {
        return this.database.query(
            `update ${this.table} set titre = ?, description = ?, illustration = ?, user_id = ?, status = ? where id = ?`,
            [service.titre, service.description, service.illustration || null, service.user_id, service.status, service.id]
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
