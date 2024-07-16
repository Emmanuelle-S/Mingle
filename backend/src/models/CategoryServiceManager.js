const AbstractManager = require("./AbstractManager");

class CategoryServiceManager extends AbstractManager {
  constructor() {
    super({ table: "category_service" });
  }

  insert(category_service) {
    return this.database.query(
      `INSERT INTO ${this.table} (titre, sous_titre, description, category_image) VALUES (?, ?, ?, ?)`,
      [
    
        category_service.titre,
        category_service.sous_titre,
        category_service.description,
        category_service.category_image
      ]
    );
  }

  update(category_service) {
    return this.database.query(
      `UPDATE ${this.table} SET titre = ?, sous_titre = ?, description = ?, category_image = ? WHERE id = ?`,
      [
        category_service.titre,
        category_service.sous_titre,
        category_service.description,
        category_service.category_image,
        category_service.id
      ]
    );
  }
}

module.exports = CategoryServiceManager;
