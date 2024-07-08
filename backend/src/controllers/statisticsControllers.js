const models = require("../models");

const getStatistics = (req, res) => {
  models.statistics
    .findLatest()
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

const addStatistics = (req, res) => {
  const statistics = req.body;
  models.statistics
    .insert(statistics)
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateStatistics = (req, res) => {
  const statistics = req.body;
  models.statistics
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
  addStatistics,
  updateStatistics,
};
