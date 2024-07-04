const models = require("../models");

const browse = (req, res) => {
    models.service
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
    models.service
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
        const service = req.body;
    
    // Validations (length, format...)
    if (
        typeof service.titre !== 'string' || service.titre.length === 0 ||
        typeof service.description !== 'string' || service.description.length === 0 ||
        typeof service.illustration !== 'string' || service.illustration.length === 0 ||
        typeof service.date !== 'string' || service.date.length === 0 || 
        typeof service.user_id !== 'number' ||
        typeof service.message_id !== 'number'
    ) {
        return res.status(400).json({ error: "Invalid input data" });
    }
    
    service.id = parseInt(req.params.id, 10);
    
    models.service
        .update(service)
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
    const service = req.body;
    
    models.service
        .insert(service)
        .then(([result]) => {
        res.location(`/services/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
        console.error(err);
        res.sendStatus(500);
        });
    };

    const destroy = (req, res) => {
    models.service
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
    
    const getServicesByCategoryId = (req, res) => {
        models.service
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

    module.exports = {
    browse,
    read,
    edit,
    add,
    destroy,
    getServicesByCategoryId
    };
