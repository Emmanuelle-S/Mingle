const models = require("../models");

const browse = (req, res) => {
  models.conversations
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.conversations
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        const conversation = rows[0];
        // Décoder les messages depuis le JSON
        try {
          conversation.messages = JSON.parse(conversation.messages);
        } catch (e) {
          console.error('Erreur de décodage JSON:', e);
          res.sendStatus(500);
          return;
        }
        res.send(conversation);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const conversations = req.body;

  // Assurez-vous que 'messages' est un tableau, même s'il n'est pas fourni
  if (!Array.isArray(conversations.messages)) {
    conversations.messages = [];
  }

  // Encode les messages en JSON avant l'insertion
  conversations.messages = JSON.stringify(conversations.messages);

  models.conversations
    .insert(conversations)
    .then(([result]) => {
      res.location(`/conversations/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const conversations = req.body;
  conversations.id = parseInt(req.params.id, 10);

  // Assurez-vous que 'messages' est JSOn, même s'il n'est pas fourni.
  // if (!Array.isArray(conversations.messages)) {
  //   conversations.messages = json.stringify(conversations.messages);
  // }

  models.conversations
    .update(conversations)
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

const destroy = (req, res) => {
  models.conversations
    .delete(req.params.id)
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
  browse,
  read,
  add,
  edit,
  destroy,
};
