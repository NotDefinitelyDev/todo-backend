const Todo = require("../models/todosModal");

module.exports.getAllTodos = async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({
    messages: "success",
    todos,
  });
};

module.exports.createTodo = async (req, res) => {
  const todos = await Todo.create(req.body);
  return res.status(201).json({
    messages: "success",
    todos,
  });
};

module.exports.deleteAllTodos = async (req, res) => {
  await Todo.deleteMany();
  return res.status(204).json({
    messages: "success",
  });
};

module.exports.deleteOneTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  return res.status(204).json({
    messages: "success",
  });
};
