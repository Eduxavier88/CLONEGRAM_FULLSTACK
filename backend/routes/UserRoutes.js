const express = require("express");
const router = express.Router();
//controller
const { register } = require("../controllers/UserController");
//middlewares
const validate = require("../middlewares/HandleValidation");
const { userCreateValidation } = require("../middlewares/UserValidation");
//Routes
router.post("/register", userCreateValidation(), validate, register);

module.exports = router;
//(req, res) => { ... }: Essa é a função que será executada quando alguém acessar a rota definida anteriormente.
// Ela recebe dois parâmetros: "req" (representando a requisição feita pelo cliente) e "res" (representando a resposta que enviaremos de volta para o cliente).
//Em resumo, esse código usa o Express para criar uma rota de teste em uma API.
//Quando alguém acessar o caminho "/", a resposta "API working" será enviada de volta para o cliente.
