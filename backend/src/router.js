const express = require("express");

const router = express.Router();
const messageControllers = require("./controllers/messageControllers");
const itemControllers = require("./controllers/itemControllers");
const userControllers= require ("./controllers/userControllers")


router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);


router.get("/user", userControllers.browse);
router.get("/user/:id", userControllers.read);
router.put("/user/:id", userControllers.edit);
router.post("/user", userControllers.add);
router.delete("/user/:id", userControllers.destroy);

router.get("/message", messageControllers.browse);
router.get("/message/:id",messageControllers.read);
router.put("/message/:id", messageControllers.edit);
router.post("/message", messageControllers.add);
router.delete("/message/:id",messageControllers.destroy);


module.exports = router;
