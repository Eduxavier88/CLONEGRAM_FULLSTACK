const express = require("express");
const router = express.Router();
//controller
const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/UserController");

//middlewares
const validate = require("../middlewares/HandleValidation");
const {
  userCreateValidation,
  loginValidation,
} = require("../middlewares/UserValidation");
const authGuard = require("../middlewares/AuthGuard");
//Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);

module.exports = router;
//(req, res) => { ... }: Essa é a função que será executada quando alguém acessar a rota definida anteriormente.
// Ela recebe dois parâmetros: "req" (representando a requisição feita pelo cliente) e "res" (representando a resposta que enviaremos de volta para o cliente).
//Em resumo, esse código usa o Express para criar uma rota de teste em uma API.
//Quando alguém acessar o caminho "/", a resposta "API working" será enviada de volta para o cliente.
