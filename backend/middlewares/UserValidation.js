const { body } = require("express-validator");
//Dentro dessa validação, estamos usando a função body("name") para especificar que queremos validar o campo "name" no corpo da requisição. A função body é uma função de alto nível fornecida pelo express-validator que permite validar campos específicos.

//Em seguida, encadeamos o método isString() para verificar se o valor do campo "name" é uma string. Se essa validação falhar, a mensagem de erro "o nome é obrigatório" será definida usando o método withMessage().

//or fim, a função userCreateValidation retorna o array contendo a validação do campo "name".

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("o nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo três caracteres."),
    //email validation
    body("email")
      .isString()
      .withMessage("O E-mail é obrigatório. ")
      .isEmail()
      .withMessage("Insira um E-mail válido"),
    //password validation
    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 5 })
      .withMessage("A senha deve possuir ao menos cinco caracteres."),
    //confrimação de senha
    body("confirmpassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatória.")
      //comparação de senha
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não conferem");
        }
        return true;
      }),
  ];
};

module.exports = {
  userCreateValidation,
};
