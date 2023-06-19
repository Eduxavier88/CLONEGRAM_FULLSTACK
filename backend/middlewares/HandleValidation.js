const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req); //const validate = (req, res, next) => { ... }: Estamos definindo uma função chamada validate
  //que recebe três parâmetros: req (representando a requisição), res (representando a resposta)
  // e next (representando o próximo middleware na cadeia de execução).

  if (errors.isEmpty()) {
    return next();
  }
  const extractErrors = [];
  errors.array().map((err) => extractErrors.push(err.msg));
  return res.status(422).json({
    errors: extractErrors,
  });
};

module.exports = validate;
