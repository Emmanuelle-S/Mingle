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

    update(faq) {
        return this.database.query(
            `UPDATE ${this.table} SET title = ?, content = ? WHERE faq_id = ?`,
            [faq.title, faq.content, faq.id]
        );
    }
}

module.exports = FAQManager;
