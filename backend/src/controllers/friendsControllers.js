const models = require("../models");

const browse = (req, res) => {
  models.friends
    .findAll()
    .then(([rows]) => {
      // Traiter chaque enregistrement pour décoder le champ 'friends'
      const processedRows = rows.map(friend => {
        try {
          // Décoder le champ 'friends' depuis JSON
          friend.friends = JSON.parse(friend.friends);
        } catch (e) {
          console.error('Erreur de décodage JSON pour l\'enregistrement:', e);
          // Gérer l'erreur de décodage ici, vous pouvez choisir de renvoyer une erreur
          return null; // Vous pouvez également choisir de renvoyer une valeur par défaut ou de filtrer ces enregistrements
        }
        return friend;
      }).filter(friend => friend !== null); // Filtrer les enregistrements invalides

      res.send(processedRows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.friends
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        const friend = rows[0];
        // Décoder les amis depuis le JSON
        try {
          friend.friends = JSON.parse(friend.friends);
        } catch (e) {
          console.error('Erreur de décodage JSON:', e);
          res.sendStatus(500);
          return;
        }
        res.send(friend);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const friends = req.body;

  // Assurez-vous que 'friends' est un tableau, même s'il n'est pas fourni
  if (!Array.isArray(friends.friends)) {
    friends.friends = [];
  }

  // Encode les amis en JSON avant l'insertion
  friends.friends = JSON.stringify(friends.friends);

  models.friends
    .insert(friends)
    .then(([result]) => {
      res.location(`/friends/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const friends = req.body;
  friends.id = parseInt(req.params.id, 10);

  // Assurez-vous que 'friends' est JSON, même s'il n'est pas fourni
  if (!Array.isArray(friends.friends)) {
    friends.friends = [];
  }

  // Encode les amis en JSON avant la mise à jour
  friends.friends = JSON.stringify(friends.friends);

  models.friends
    .update(friends)
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
  models.friends
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
