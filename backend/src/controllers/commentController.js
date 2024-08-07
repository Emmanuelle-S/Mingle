const models = require("../models");

const browse = (req, res) => {
    models.comment
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
    models.comment
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
    const comment = req.body;

    // TODO validations (length, format...)

    comment.id = parseInt(req.params.id, 10);

    models.comment
        .update(comment)
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

const add = (req, res) => {
    const comment = req.body;

    // TODO validations (length, format...)

    models.comment
        .insert(comment)
        .then(([result]) => {
            res.location(`/comments/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const destroy = (req, res) => {
    const commentId = req.params.id;

    models.comment
        .delete(commentId)
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

const getCommentByServiceId = (req, res) => {
    models.comment
        .findCommentByServiceId(req.params.id)
        .then(([rows]) => {
            if (rows[0] == null) {
                res.sendStatus(404);
            } else {
                res.send(rows);
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

module.exports = {
    getCommentByServiceId,
    browse,
    read,
    edit,
    add,
    destroy,
};
