const AbstractManager = require("./AbstractManager");

class FAQManager extends AbstractManager {
    constructor() {
        super({ table: "faq" });
    }

    insert(faq) {
        return this.database.query(
            `INSERT INTO ${this.table} (title, content) VALUES (?, ?)`,
            [faq.title, faq.content]
        );
    }

    delete(id) {
        return this.database.query(`DELETE FROM ${this.table} WHERE faq_id = ?`, [id]);
    }

    update(faq) {
        return this.database.query(
            `UPDATE ${this.table} SET title = ?, content = ? WHERE faq_id = ?`,
            [faq.title, faq.content, faq.faq_id]
        );
    }
}

module.exports = FAQManager;
