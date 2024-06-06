const AbstractManager = require("./AbstractManager");

class ServiceManager extends AbstractManager {
    constructor() {
        super({ table: "services" });
    }

    insert(services) {
        return this.database.query(`insert into ${this.table} (titre, description, illustration) values (?, ?, ?)`, 
            [services.titre, services.description, services.illustration]);
    }

    update(services) {
        return this.database.query(
        `update ${this.table} set titre = ?, description = ?, illustration = ? where id = ?`,
        [services.titre, services.description, services.illustration, services.id]);
    }
}

module.exports = ServiceManager;
