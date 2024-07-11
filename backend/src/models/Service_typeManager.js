const AbstractManager = require("./AbstractManager");

class ServiceTypeManager extends AbstractManager {
    constructor() {
        super({ table: "service_type" }); // Assurez-vous que le nom de la table est correct
    }

    insert(serviceType) {
        return this.database.query(
            `INSERT INTO ${this.table} (service_id, catégorie_id) VALUES (?, ?)`, 
            [serviceType.service_id, serviceType.category_id]
        );
    }

    // Autres méthodes pour la gestion des types de service (update, delete, etc.)
}

module.exports = ServiceTypeManager;