# Render deploy

https://mingle-t13i.onrender.com/


# Documentation des Endpoints de l'API
## Items
GET /items

    Description: Récupère tous les items.
    Réponse: JSON contenant la liste des items.

GET /items/

    Description: Récupère un item spécifique par son ID.
    Paramètres:
        id (path) : ID de l'item à récupérer.
    Réponse: JSON contenant les détails de l'item.

POST /items

    Description: Ajoute un nouvel item.
    Body: JSON contenant les informations de l'item à ajouter.
    Réponse: JSON contenant l'item ajouté.

PUT /items/

    Description: Met à jour un item existant.
    Paramètres:
        id (path) : ID de l'item à mettre à jour.
    Body: JSON contenant les nouvelles informations de l'item.
    Réponse: JSON contenant l'item mis à jour.

DELETE /items/

    Description: Supprime un item.
    Paramètres:
        id (path) : ID de l'item à supprimer.
    Réponse: Confirmation de la suppression.

## Users
GET /users

    Description: Récupère tous les utilisateurs.
    Réponse: JSON contenant la liste des utilisateurs.

GET /users/

    Description: Récupère un utilisateur spécifique par son ID.
    Paramètres:
        id (path) : ID de l'utilisateur à récupérer.
    Réponse: JSON contenant les détails de l'utilisateur.

POST /users

    Description: Ajoute un nouvel utilisateur.
    Body: JSON contenant les informations de l'utilisateur à ajouter.
    Réponse: JSON contenant l'utilisateur ajouté.

PUT /users/

    Description: Met à jour un utilisateur existant.
    Paramètres:
        id (path) : ID de l'utilisateur à mettre à jour.
    Body: JSON contenant les nouvelles informations de l'utilisateur.
    Réponse: JSON contenant l'utilisateur mis à jour.

DELETE /users/

    Description: Supprime un utilisateur.
    Paramètres:
        id (path) : ID de l'utilisateur à supprimer.
    Réponse: Confirmation de la suppression.

## Services
GET /service

    Description: Récupère tous les services.
    Réponse: JSON contenant la liste des services.

GET /service/

    Description: Récupère un service spécifique par son ID.
    Paramètres:
        id (path) : ID du service à récupérer.
    Réponse: JSON contenant les détails du service.

POST /service

    Description: Ajoute un nouveau service.
    Body: JSON contenant les informations du service à ajouter.
    Réponse: JSON contenant le service ajouté.

PUT /service/

    Description: Met à jour un service existant.
    Paramètres:
        id (path) : ID du service à mettre à jour.
    Body: JSON contenant les nouvelles informations du service.
    Réponse: JSON contenant le service mis à jour.

DELETE /service/

    Description: Supprime un service.
    Paramètres:
        id (path) : ID du service à supprimer.
    Réponse: Confirmation de la suppression.

## Messages
GET /message

    Description: Récupère tous les messages.
    Réponse: JSON contenant la liste des messages.

GET /message/

    Description: Récupère un message spécifique par son ID.
    Paramètres:
        id (path) : ID du message à récupérer.
    Réponse: JSON contenant les détails du message.

POST /message

    Description: Ajoute un nouveau message.
    Body: JSON contenant les informations du message à ajouter.
    Réponse: JSON contenant le message ajouté.

PUT /message/

    Description: Met à jour un message existant.
    Paramètres:
        id (path) : ID du message à mettre à jour.
    Body: JSON contenant les nouvelles informations du message.
    Réponse: JSON contenant le message mis à jour.

DELETE /message/

    Description: Supprime un message.
    Paramètres:
        id (path) : ID du message à supprimer.
    Réponse: Confirmation de la suppression.

## Friends
GET /friends

    Description: Récupère tous les amis.
    Réponse: JSON contenant la liste des amis.

GET /friends/

    Description: Récupère un ami spécifique par son ID.
    Paramètres:
        id (path) : ID de l'ami à récupérer.
    Réponse: JSON contenant les détails de l'ami.

POST /friends

    Description: Ajoute un nouvel ami.
    Body: JSON contenant les informations de l'ami à ajouter.
    Réponse: JSON contenant l'ami ajouté.

PUT /friends/

    Description: Met à jour un ami existant.
    Paramètres:
        id (path) : ID de l'ami à mettre à jour.
    Body: JSON contenant les nouvelles informations de l'ami.
    Réponse: JSON contenant l'ami mis à jour.

DELETE /friends/

    Description: Supprime un ami.
    Paramètres:
        id (path) : ID de l'ami à supprimer.
    Réponse: Confirmation de la suppression.

## Conversations
GET /conversation

    Description: Récupère toutes les conversations.
    Réponse: JSON contenant la liste des conversations.

GET /conversation/

    Description: Récupère une conversation spécifique par son ID.
    Paramètres:
        id (path) : ID de la conversation à récupérer.
    Réponse: JSON contenant les détails de la conversation.

POST /conversation

    Description: Ajoute une nouvelle conversation.
    Body: JSON contenant les informations de la conversation à ajouter.
    Réponse: JSON contenant la conversation ajoutée.

PUT /conversation/

    Description: Met à jour une conversation existante.
    Paramètres:
        id (path) : ID de la conversation à mettre à jour.
    Body: JSON contenant les nouvelles informations de la conversation.
    Réponse: JSON contenant la conversation mise à jour.

DELETE /conversation/

    Description: Supprime une conversation.
    Paramètres:
        id (path) : ID de la conversation à supprimer.
    Réponse: Confirmation de la suppression.

## Category Service
GET /categoryservice

    Description: Récupère toutes les catégories de services.
    Réponse: JSON contenant la liste des catégories de services.

GET /categoryservice/

    Description: Récupère une catégorie de service spécifique par son ID.
    Paramètres:
        id (path) : ID de la catégorie de service à récupérer.
    Réponse: JSON contenant les détails de la catégorie de service.

POST /categoryservice

    Description: Ajoute une nouvelle catégorie de service.
    Body: JSON contenant les informations de la catégorie de service à ajouter.
    Réponse: JSON contenant la catégorie de service ajoutée.

PUT /categoryservice/

    Description: Met à jour une catégorie de service existante.
    Paramètres:
        id (path) : ID de la catégorie de service à mettre à jour.
    Body: JSON contenant les nouvelles informations de la catégorie de service.
    Réponse: JSON contenant la catégorie de service mise à jour.

DELETE /categoryservice/

    Description: Supprime une catégorie de service.
    Paramètres:
        id (path) : ID de la catégorie de service à supprimer.
    Réponse: Confirmation de la suppression.

## Comments
GET /comments

    Description: Récupère tous les commentaires.
    Réponse: JSON contenant la liste des commentaires.

GET /comments/

    Description: Récupère un commentaire spécifique par son ID.
    Paramètres:
        id (path) : ID du commentaire à récupérer.
    Réponse: JSON contenant les détails du commentaire.

POST /comments

    Description: Ajoute un nouveau commentaire.
    Body: JSON contenant les informations du commentaire à ajouter.
    Réponse: JSON contenant le commentaire ajouté.

PUT /comments/

    Description: Met à jour un commentaire existant.
    Paramètres:
        id (path) : ID du commentaire à mettre à jour.
    Body: JSON contenant les nouvelles informations du commentaire.
    Réponse: JSON contenant le commentaire mis à jour.

DELETE /comments/

    Description: Supprime un commentaire.
    Paramètres:
        id (path) : ID du commentaire à supprimer.
    Réponse: Confirmation de la suppression.

GET /comments/service/

    Description: Récupère tous les commentaires pour un service spécifique par l'ID du service.
    Paramètres:
        id (path) : ID du service pour lequel récupérer les commentaires.
    Réponse: JSON contenant la liste des commentaires pour le service spécifié.

## FAQ
GET /faq

    Description: Récupère toutes les questions fréquentes (FAQ).
    Réponse: JSON contenant la liste des FAQs.

GET /faq/

    Description: Récupère une FAQ spécifique par son ID.
    Paramètres:
        id (path) : ID de la FAQ à récupérer.
    Réponse: JSON contenant les détails de la FAQ.

POST /faq

    Description: Ajoute une nouvelle FAQ.
    Body: JSON contenant les informations de la FAQ à ajouter.
    Réponse: JSON contenant la FAQ ajoutée.

PUT /faq/

    Description: Met à jour une FAQ existante.
    Paramètres:
        id (path) : ID de la FAQ à mettre à jour.
    Body: JSON contenant les nouvelles informations de la FAQ.
    Réponse: JSON contenant la FAQ mise à jour.

DELETE /faq/

    Description: Supprime une FAQ.
    Paramètres:
        id (path) : ID de la FAQ à supprimer.
    Réponse: Confirmation de la suppression.

## Authentification
POST /user/login

    Description: Authentifie un utilisateur par email et mot de passe.
    Body: JSON contenant l'email et le mot de passe de l'utilisateur.
    Réponse: JSON contenant les informations de l'utilisateur et un token de session si l'authentification est réussie.

## Protected Routes
GET /user/protected

    Description: Accède aux informations des utilisateurs (protégé, nécessite une authentification).
    Réponse: JSON contenant la liste des utilisateurs (accessible uniquement avec un token valide).
