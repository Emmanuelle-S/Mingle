## Installation & Utilisation

### Pour commencer un projet

- Cloner ce dépôt, se rendre à l'intérieur
- Lancer la commande `npm install`
- _NB: Pour exécuter le backend, un fichier d'environnement avec les données de connexion d'une BdD valide est nécesaire. Un modèle se trouve dans `backend/.env.sample`_

### Liste des commandes et signification

- `migrate` : Exécute le script de création de la base de données
- `dev` : Démarrage des deux serveurs (frontend + backend) dans un même terminal
- `dev-front` : Démarrage d'un serveur React pour le frontend
- `dev-back` : Démarrage d'un serveur Express pour le backend

## Pour plus d'informations

### Listing des outils utilisés

- _Concurrently_ : Permet d'exécuter plusieurs commandes dans un même terminal
- _Vite_ : Alternative à _Create-React-App_, embarquant moins de packages pour une expérience plus fluide
- _Nodemon_ : Outil permettant de relancer un serveur à chaque fois qu'un des fichiers est modifié
