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
        typeof service.user_id !== 'number'
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
    
    const add = async (req, res) => {
        const { titre, description, illustration, user_id, category_id } = req.body;
    
        console.log("Starting add service process...");
        console.log("Request body:", req.body); // Log les données de la requête
    
        try {
            // Insertion du nouveau service dans la base de données
            const [result] = await models.service.insert({
                titre,
                description,
                illustration,
                user_id,
            });
    
            console.log("New service inserted:", result); // Log le résultat de l'insertion
    
            const serviceId = result.insertId;
    
            console.log("Generated service ID:", serviceId); // Log si l'ID généré est incorrect
    
            if (!serviceId) {
                console.error("Generated service ID is falsy:", serviceId); // Log si category_id est manquant
                return res.status(500).json({ error: "L'ID du service n'a pas été généré correctement" });
            }
    
            // Assurez-vous que category_id est défini
            if (!category_id) {
                console.error("category_id is missing or falsy:", category_id); // Log si category_id est manquant
                return res.status(400).json({ error: "category_id is required" });
            }
    
            // Insertion dans la table service_type
            await models.service_type.insert({
                service_id: serviceId,
                category_id,
            });
    
            console.log("Service type inserted successfully."); // Log le succès de la création
    
            return res.status(201).json({ id: serviceId });
        } catch (error) {
            console.error("Erreur lors de la création du service:", error); // Log l'erreur survenue
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
