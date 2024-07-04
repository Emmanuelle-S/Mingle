const express = require("express");

const router = express.Router();
const messageControllers = require("./controllers/messageControllers");
const itemControllers = require("./controllers/itemControllers");
const userControllers= require ("./controllers/userControllers")
const serviceControllers = require("./controllers/serviceControllers")
const categoryserviceControllers = require ("./controllers/categoryserviceControllers")
const friendsControllers = require("./controllers/friendsControllers");
const conversationControllers = require("./controllers/conversationControllers");


router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

router.get("/service", serviceControllers.browse);
router.get("/service/:id", serviceControllers.read);
router.put("/service/:id", serviceControllers.edit);
router.post("/service", serviceControllers.add);
router.delete("/service/:id", serviceControllers.destroy);

router.get("/message", messageControllers.browse);
router.get("/message/:id",messageControllers.read);
router.put("/message/:id", messageControllers.edit);
router.post("/message", messageControllers.add);
router.delete("/message/:id",messageControllers.destroy);

router.get("/friends", friendsControllers.browse);
router.get("/friends/:id",friendsControllers.read);
router.put("/friends/:id", friendsControllers.edit);
router.post("/friends", friendsControllers.add);
router.delete("/friends/:id",friendsControllers.destroy);

router.get("/conversation", conversationControllers.browse);
router.get("/conversation/:id",conversationControllers.read);
router.put("/conversation/:id", conversationControllers.edit);
router.post("/conversation", conversationControllers.add);
router.delete("/conversation/:id",conversationControllers.destroy);

router.get("/categoryservice", categoryserviceControllers.browse);
router.get("/categoryservice/:id", categoryserviceControllers.read);
router.put("/categoryservice/:id", categoryserviceControllers.edit);
router.post("/categoryservice", categoryserviceControllers.add);
router.delete("/categoryservice/:id", categoryserviceControllers.destroy);

router.get("/service_type", serviceControllers.browse);
router.get("/service_type/:id", serviceControllers.read);
router.put("/service_type/:id", serviceControllers.edit);
router.post("/service_type", serviceControllers.add);
router.delete("/service_type/:id", serviceControllers.destroy);

router.get("/service/category/:id",serviceControllers.getServicesByCategoryId);



// ROUTE LOGIN

router.post(
    "/user/login", 
    userControllers.getUserByEmail, 
    userControllers.verifyPassword,    
);
    
// router.use(userControllers.verifyToken); // tout ce qui est en dessous est privé
router.get("/user/protected", userControllers.browse)
    
module.exports = router;