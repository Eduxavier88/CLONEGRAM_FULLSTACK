//Rotas da aplicação

const express = require("express");
const router = express();
//teste de rota
router.get("/", (req, res) => {
  res.send("API working");
});
module.exports = router;
