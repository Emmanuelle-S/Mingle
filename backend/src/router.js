const express = require("express");

const router = express.Router();
const messageControllers = require("./controllers/messageControllers");
const itemControllers = require("./controllers/itemControllers");
const userControllers= require ("./controllers/userControllers")
const serviceControllers = require("./controllers/serviceControllers")
const categoryserviceControllers = require ("./controllers/categoryserviceControllers")


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

router.get("/categoryservice", categoryserviceControllers.browse);
router.get("/categoryservice/:id", categoryserviceControllers.read);
router.put("/categoryservice/:id", categoryserviceControllers.edit);
router.post("/categoryservice", categoryserviceControllers.add);
router.delete("/categoryservice/:id", categoryserviceControllers.destroy);




// ROUTE LOGIN

router.post(
    "/user/login", 
    userControllers.getUserByEmail, 
    userControllers.verifyPassword,    
);
    
// router.use(userControllers.verifyToken); // tout ce qui est en dessous est privé
router.get("/user/protected", userControllers.browse)
    
module.exports = router;