const AbstractManager = require("./AbstractManager");

class CategoryServiceManager extends AbstractManager {
  constructor() {
    super({ table: "category_service" });
  }

  insert(category_service) {
    return this.database.query(
      `INSERT INTO ${this.table} (titre_catégorie, titre_sous_catégorie, category_image) VALUES (?, ?, ?)`,
      [
    
        category_service.titre_catégorie,
        category_service.titre_sous_catégorie,
        category_service.category_image,
      ]
    );
  }

  update(category_service) {
    return this.database.query(
      `UPDATE ${this.table} SET titre_catégorie = ?, titre_sous_catégorie = ?, category_description = ? WHERE id = ?`,
      [
        category_service.titre_catégorie,
        category_service.titre_sous_catégorie,
        category_service.category_description,
        category_service.id
      ]
    );
  }
}

module.exports = CategoryServiceManager;
