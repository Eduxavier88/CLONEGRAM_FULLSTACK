const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

//gENENRATE USER TOKEN

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "5d",
  });
};

// Reister user and sign in

const register = async (req, res) => {
  res.send("Registro");
};

module.exports = {
  register,
};

//const User = require("../models/User");: Aqui estamos importando o módulo User de um arquivo chamado "User.js" localizado em uma pasta "../models".

//const bcrypt = require("bcryptjs");: Estamos importando o módulo "bcryptjs" que é usado para criptografar senhas.

//const jwt = require("jsonwebtoken");: Aqui estamos importando o módulo "jsonwebtoken" que é usado para gerar tokens de autenticação.

//const jwtSecret = process.env.JWT_SECRET;: Estamos obtendo uma chave secreta para a geração dos tokens a partir de uma variável de ambiente chamada "JWT_SECRET".

//const generateToken = (id) => { ... }: Aqui estamos definindo uma função chamada "generateToken" que recebe um parâmetro "id". Essa função é responsável por gerar o token de autenticação do usuário.

//return jwt.sign({ id }, jwtSecret, { expiresIn: "5d" });: Dentro da função "generateToken", estamos usando o método "sign" do módulo "jsonwebtoken" para gerar o token.
//Estamos passando um objeto com a propriedade "id", que será incluída no token. Também estamos passando a chave secreta "jwtSecret" e definindo que o token expirará em 5 dias.

//Em resumo, esse código importa alguns módulos necessários, define uma
//função para gerar tokens de autenticação de usuário e usa o módulo "jsonwebtoken" para gerar o token com base na chave secreta fornecida.
