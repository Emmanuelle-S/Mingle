class AbstractManager {
  // déclare une nouvelle classe AbstractManager =>  les classes = des modèles pour créer des objets : encapsulent les données et les comportements associés à ces données.
  constructor({ table }) {
    this.table = table;
    // constructor = une méthode spéciale pour créer et initialiser un objet créé à partir d'une classe => prend un objet avec une propriété table et initialise this.table avec cette valeur.
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
    // Méthode qui prend un id en paramètre et retourne une promesse qui exécute une requête SQL pour sélectionner toutes les colonnes d'une table où l'ID correspond à l'ID fourni.
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
    // Méthode qui retourne une promesse qui exécute une requête SQL pour sélectionner toutes les colonnes de la table.
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
    // Méthode qui prend un id en paramètre et retourne une promesse qui exécute une requête SQL pour supprimer une ligne de la table où l'ID correspond à l'ID fourni.
  }

  setDatabase(database) {
    this.database = database;
    // Méthode qui permet de définir l'objet "database", utilisé par les autres méthodes pour exécuter les requêtes SQL.
  }
}

module.exports = AbstractManager;
