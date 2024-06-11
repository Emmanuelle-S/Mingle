const AbstractManager = require("./AbstractManager");

class CategoryServiceManager extends AbstractManager {
  constructor() {
    super({ table: "category_service" });
  }

  insert(category_service) {
    return this.database.query(
      `INSERT INTO ${this.table} (titre_catégorie, titre_sous_catégorie) VALUES (?, ?)`,
      [
    
        category_service.titre_catégorie,
        category_service.titre_sous_catégorie,

      ]
    );
  }

  update(category_service) {
    return this.database.query(
      `UPDATE ${this.table} SET titre_catégorie = ?, titre_sous_catégorie = ?`,
      [
        category_service.titre_catégorie,
        category_service.titre_sous_catégorie,
      ]
    );
  }
}

module.exports = CategoryServiceManager;
