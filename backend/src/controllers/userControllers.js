const models = require("../models");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const browse = (req, res) => {
  models.user
  // objet models qui utilise les propriétés de la valeur user
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
  models.user
    .find(req.params.id)
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

const edit = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
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

const add = async (req, res) => {
  const user = req.body;

  try {
    // TODO validations (length, format...)
    user.user_pass = await argon2.hash(user.user_pass);

    models.user
      .insert(user)
      .then(([result]) => {
        res.location(`/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};


// La fonction getUserByEmailWithPasswordAndPassToNext() permet de trouver un utilisateur spécifique en fonction de son adresse e-mail et d'envoyer une réponse 401 si l'utilisateur n'est pas trouvé ou une erreur 500 si une erreur survient lors du traitement des données.
const getUserByEmail= (req, res, next) => {
  const { mail } = req.body;
  // console.log(mail);
  models.user
  .findUserByEmail(mail)
  .then(([user]) => {
    if (user[0] != null) {
      const [firstUser] = user;
      req.user = firstUser;
      console.log(req.user);
      // res.sendStatus(200)
      next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.user_pass, req.body.user_pass)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        console.log(token, "token");

        // delete req.user.hashedPassword;
        res
          .status(201)
          .send({ token, userId: req.user.id, toggle: process.env.APP_DECO }); //  retour token + user ID
      } else {
        return res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const destroy = (req, res) => {
  models.user
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
  edit,
  add,
  destroy,
  getUserByEmail,
  verifyPassword,
  verifyToken
};
