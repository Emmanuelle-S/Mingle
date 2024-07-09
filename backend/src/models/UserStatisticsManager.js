const AbstractManager = require("./AbstractManager");

class UserStatisticsManager extends AbstractManager {
  constructor() {
    super({ table: "user_statistics" });
  }

  insert(statistics) {
    return this.database.query(`INSERT INTO ${this.table} (user_id, total_services_published, active_services, inactive_services, messages_sent, messages_received, profile_views, service_requests_received, services_completed) VALUES (?,?,?,?,?,?,?,?,?)`, [
      statistics.user_id,
      statistics.total_services_published,
      statistics.active_services,
      statistics.inactive_services,
      statistics.messages_sent,
      statistics.messages_received,
      statistics.profile_views,
      statistics.service_requests_received,
      statistics.services_completed
    ]);
  }

  update(statistics) {
    const fields = [];
    const values = [];

    if (statistics.total_services_published !== undefined) {
      fields.push("total_services_published = ?");
      values.push(statistics.total_services_published);
    }
    if (statistics.active_services !== undefined) {
      fields.push("active_services = ?");
      values.push(statistics.active_services);
    }
    if (statistics.inactive_services !== undefined) {
      fields.push("inactive_services = ?");
      values.push(statistics.inactive_services);
    }
    if (statistics.messages_sent !== undefined) {
      fields.push("messages_sent = ?");
      values.push(statistics.messages_sent);
    }
    if (statistics.messages_received !== undefined) {
      fields.push("messages_received = ?");
      values.push(statistics.messages_received);
    }
    if (statistics.profile_views !== undefined) {
      fields.push("profile_views = ?");
      values.push(statistics.profile_views);
    }
    if (statistics.service_requests_received !== undefined) {
      fields.push("service_requests_received = ?");
      values.push(statistics.service_requests_received);
    }
    if (statistics.services_completed !== undefined) {
      fields.push("services_completed = ?");
      values.push(statistics.services_completed);
    }

    values.push(statistics.user_id);

    const sql = `UPDATE ${this.table} SET ${fields.join(", ")} WHERE user_id = ?`;

    return this.database.query(sql, values);
  }

  findByUserId(user_id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE user_id = ?`, [user_id]);
  }
}

module.exports = UserStatisticsManager;
