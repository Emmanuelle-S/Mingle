const { body, validationResult } = require("express-validator");

// Middleware pour vérifier si on est en mode création (POST) ou édition (PUT)
const validateUser = (req, res, next) => {
  // Validation commune pour les deux opérations
  let validations = [
    body("username").isLength({ min: 3 }).withMessage("Le nom d'utilisateur doit comporter au moins 3 caractères"),
    body("mail").isEmail().withMessage("Adresse mail invalide"),
    body("localisation").optional().isLength({ min: 2 }).withMessage("La ville doit comporter au moins 2 caractères"),
    body("biographie").optional().isLength({ min: 10 }).withMessage("La biographie doit contenir au moins 10 caractères"),
    body("service_type").optional().isLength({ min: 5 }).withMessage("Les services doivent contenir au moins 5 caractères"),
  ];

  // Ajouter la validation du mot de passe si la requête est une création
  if (req.method === 'POST') {
    validations.push(
      body("user_pass")
        .isLength({ min: 6 }).withMessage("Le mot de passe doit comporter au moins 6 caractères")
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Le mot de passe doit comporter au moins 1 caractère spécial")
    );
  }

  // Appliquer les validations
  Promise.all(validations.map(validation => validation.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  });
};

module.exports = {
  validateUser,
};
