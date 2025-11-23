const router = require("express").Router();
const todoController = require("../controllers/todoController");
const protectRouter = require("../middlewares/protectRoute");

router.use(protectRouter);

router
  .route("/")
  .get(todoController.getAllTodos)
  .post(todoController.createTodo)
  .delete(todoController.deleteAllTodos);

router.delete("/:id", todoController.deleteOneTodo);

module.exports = router;
