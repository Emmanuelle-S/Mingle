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
}


module.exports = ServiceManager;
