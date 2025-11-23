const router = require("express").Router();
const userController = require("../controllers/userController");

// Register api
router.post("/register", userController.register);

// Login api
router.post("/login", userController.login);

module.exports = router;
