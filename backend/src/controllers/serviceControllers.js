const models = require("../models");
const path = require('path');
const fs = require('fs');

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

const add = async (req, res) => {
    const { titre, description, user_id, category_id } = req.body;
    let illustration = null;

    if (req.files && req.files.image) {
        const image = req.files.image;
        const uploadDir = path.join(__dirname, "..", "public", "uploads");
    
        // Vérifie si le dossier existe, sinon le crée
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
    
        const uploadPath = path.join(uploadDir, image.name);
        
        try {
            await image.mv(uploadPath);
            illustration = `/uploads/${image.name}`;
        } catch (err) {
            console.error("Erreur lors du téléversement de l'image:", err);
            return res.status(500).json({ error: "Erreur lors du téléversement de l'image" });
        }
    }

    try {
        const [result] = await models.service.insert({
            titre,
            description,
            illustration,
            user_id,
        });

        const serviceId = result.insertId;

        if (!serviceId) {
            return res.status(500).json({ error: "L'ID du service n'a pas été généré correctement" });
        }

        // Assurez-vous que category_id est défini
        if (!category_id) {
            return res.status(400).json({ error: "category_id is required" });
        }

        // Insertion dans la table service_type
        await models.service_type.insert({
            service_id: serviceId,
            category_id,
        });

        return res.status(201).json({ id: serviceId });
    } catch (error) {
        console.error("Erreur lors de la création du service:", error);
        return res.status(500).json({ error: "Erreur interne du serveur lors de la création du service" });
    }
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
