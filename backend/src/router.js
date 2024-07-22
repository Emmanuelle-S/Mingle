const express = require("express");

const router = express.Router();
const messageControllers = require("./controllers/messageControllers");
const itemControllers = require("./controllers/itemControllers");
const userControllers= require ("./controllers/userControllers")
const serviceControllers = require("./controllers/serviceControllers")
const categoryserviceControllers = require ("./controllers/categoryserviceControllers")
const friendsControllers = require("./controllers/friendsControllers");
const conversationControllers = require("./controllers/conversationControllers");
const commentController = require('./controllers/commentController');
const faqControllers = require("./controllers/faqControllers");

const {validateUser, validateConversation, validateFriend,validateCategory, validateService,validateComment} = require("./validators")


router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", validateUser, userControllers.edit);
router.post("/users", validateUser, userControllers.add);
router.delete("/users/:id", userControllers.destroy);

router.get("/service", serviceControllers.browse);
router.get("/service/:id", serviceControllers.read);
router.put("/service/:id", validateService, serviceControllers.edit);
router.post("/service", validateService, serviceControllers.add);
router.delete("/service/:id", serviceControllers.destroy);

router.get("/message", messageControllers.browse);
router.get("/message/:id",messageControllers.read);
router.put("/message/:id", messageControllers.edit);
router.post("/message", messageControllers.add);
router.delete("/message/:id",messageControllers.destroy);

router.get("/friends", friendsControllers.browse);
router.get("/friends/:id",friendsControllers.read);
router.put("/friends/:id", validateFriend, friendsControllers.edit);
router.post("/friends", validateFriend, friendsControllers.add);
router.delete("/friends/:id",friendsControllers.destroy);

router.get("/conversation", conversationControllers.browse);
router.get("/conversation/:id",conversationControllers.read);
router.put("/conversation/:id",validateConversation, conversationControllers.edit);
router.post("/conversation",validateConversation, conversationControllers.add);
router.delete("/conversation/:id",conversationControllers.destroy);
// comment fonctionne la validation des données
router.get("/categoryservice", categoryserviceControllers.browse);
router.get("/categoryservice/:id", categoryserviceControllers.read);
router.put("/categoryservice/:id", validateCategory,categoryserviceControllers.edit);
router.post("/categoryservice",validateCategory,categoryserviceControllers.add);
router.delete("/categoryservice/:id", categoryserviceControllers.destroy);

router.get("/service_type", serviceControllers.browse);
router.get("/service_type/:id", serviceControllers.read);
router.put("/service_type/:id", serviceControllers.edit);
router.post("/service_type", serviceControllers.add);
router.delete("/service_type/:id", serviceControllers.destroy);


router.get('/comments', commentController.browse);
router.get('/comments/:id', commentController.read);
router.post('/comments', validateComment,commentController.add);
router.put('/comments/:id',validateComment, commentController.edit);
router.delete('/comments/:id', commentController.destroy);
router.get('/comments/service/:id',commentController.getCommentByServiceId)

router.get("/service/category/:id",serviceControllers.getServicesByCategoryId);




router.get("/faq", faqControllers.browse);
router.get("/faq/:id", faqControllers.read);
router.put("/faq/:id", faqControllers.edit);
router.post("/faq", faqControllers.add);
router.delete("/faq/:id", faqControllers.destroy);

// ROUTE LOGIN

router.post(
    "/user/login", 
    userControllers.getUserByEmail, 
    userControllers.verifyPassword,    
);
    
// router.use(userControllers.verifyToken); // tout ce qui est en dessous est privé
router.get("/user/protected", userControllers.browse)
    
module.exports = router;