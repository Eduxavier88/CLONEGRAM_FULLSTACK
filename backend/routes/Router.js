//Rotas da aplicação

const express = require("express");
const router = express();
router.use("/api/users", require("./UserRoutes")); //router.use("/api/users", require("./UserRoutes"));: Aqui estamos usando o método use do objeto router para adicionar um middleware de rota. Esse middleware será aplicado a qualquer requisição que comece com o caminho "/api/users".

//teste de rota
router.get("/", (req, res) => {
  res.send("API working");
});
module.exports = router;
