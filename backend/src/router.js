const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers")
const userControllers= require ("./controllers/userControllers")
const serviceController = require("./controllers/serviceControllers")
const categoryserviceControllers = require ("./controllers/categoryserviceControllers")


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

router.get("/service", serviceController.browse);
router.get("/service/:id", serviceController.read);
router.put("/service/:id", serviceController.edit);
router.post("/service", serviceController.add);
router.delete("/service/:id", serviceController.destroy);

router.get("/categoryservice", categoryserviceControllers.browse);
router.get("/categoryservice/:id", categoryserviceControllers.read);
router.put("/categoryservice/:id", categoryserviceControllers.edit);
router.post("/categoryservice", categoryserviceControllers.add);
router.delete("/categoryservice/:id", categoryserviceControllers.destroy);





module.exports = router;
