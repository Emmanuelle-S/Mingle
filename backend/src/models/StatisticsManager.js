const AbstractManager = require("./AbstractManager");

class StatisticsManager extends AbstractManager {
  constructor() {
    super({ table: "statistics" });
  }

  findLatest() {
    return this.database.query(`SELECT * FROM ${this.table} ORDER BY date DESC LIMIT 1`);
  }

  insert(statistics) {
    return this.database.query(
      `INSERT INTO ${this.table} (publishedServices, interestedUsers, interactions, totalUsers, totalMessages, activeUsers, newRegistrations, totalConversations, avgSessionTime, bounceRate, totalRevenue, totalExpenses, netProfit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        statistics.publishedServices,
        statistics.interestedUsers,
        statistics.interactions,
        statistics.totalUsers,
        statistics.totalMessages,
        statistics.activeUsers,
        statistics.newRegistrations,
        statistics.totalConversations,
        statistics.avgSessionTime,
        statistics.bounceRate,
        statistics.totalRevenue,
        statistics.totalExpenses,
        statistics.netProfit
      ]
    );
  }

  update(statistics) {
    return this.database.query(
      `UPDATE ${this.table} SET publishedServices = ?, interestedUsers = ?, interactions = ?, totalUsers = ?, totalMessages = ?, activeUsers = ?, newRegistrations = ?, totalConversations = ?, avgSessionTime = ?, bounceRate = ?, totalRevenue = ?, totalExpenses = ?, netProfit = ? WHERE id = ?`,
      [
        statistics.publishedServices,
        statistics.interestedUsers,
        statistics.interactions,
        statistics.totalUsers,
        statistics.totalMessages,
        statistics.activeUsers,
        statistics.newRegistrations,
        statistics.totalConversations,
        statistics.avgSessionTime,
        statistics.bounceRate,
        statistics.totalRevenue,
        statistics.totalExpenses,
        statistics.netProfit,
        statistics.id
      ]
    );
  }
}

module.exports = StatisticsManager;
