const User = require("../models/User");
//resolver requisicao getByid
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const mongoose = require("mongoose");

//gENENRATE USER TOKEN

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "5d",
  });
};

// Reister user and sign in

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //check if user exists
  const user = await User.findOne({ email }); //A função findOne retorna o primeiro usuário encontrado que corresponda aos critérios de busca. Essa busca é feita com base no valor da propriedade email.

  if (user) {
    res.status(422).json({ errors: ["Por favor, utilize outro E-mail."] });
    return;
  }
  //generate passwordhash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  //create user

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });
  //if user was created sussfull, retunr tken
  if (!newUser) {
    res.status(422).json({
      errors: "Erro ao criar conta. Por favor tente mais tarde",
    });
    return;
  }
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};
//Sign user in
const login = async (req, res) => {
  const { email, password } = req.body;
  //verificando se o usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ errors: ["O usuário não existe"] });
    return;
  }
  //check if matches ´passoword
  if (!bcrypt.compare(password, user.password)) {
    res.status(422).json({ errors: ["Senha invalida"] });
    return;
  }
  //return user with token
  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};
//Get current logged in user

const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};
//update an user
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  const user = await User.findById(
    new mongoose.Types.ObjectId(reqUser._id)
  ).select("-password");

  if (name) {
    user.name = name;
  }

  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

// Get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(mongoose.Types.ObjectId(id)).select(
      "-password"
    );
    // Check if user exists
    if (!user) {
      res.status(404).json({ errors: ["Usuário não encontrado!2"] });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ errors: ["Usuário não encontrado!2"] });
    return;
  }
};
module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
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
