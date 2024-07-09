const models = require("../models");

const getStatistics = (req, res) => {
  models.userStatistics
    .findByUserId(req.params.user_id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateStatistics = (req, res) => {
  const statistics = req.body;
  statistics.user_id = parseInt(req.params.user_id, 10);

  models.userStatistics
    .update(statistics)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getStatistics,
  updateStatistics,
};
