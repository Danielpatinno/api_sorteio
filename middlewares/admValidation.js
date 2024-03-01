const { body } = require('express-validator')

const admCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("")
      .isLength({min: 3})
      .withMessage("O nome é obrigatório."),
    body("email")
      .isString()
      .withMessage("O e-mail ée obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail válido."),
    body("password")
      .isString()
      .withMessage("A senha é obrigatório.")
      .isLength({min: 5})
      .withMessage("A senha é obrigatória."),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmção de senha é obrigatória.")
      .isLength({min: 5})
      .withMessage("A confirmção de senha é obrigatória.")
      .custom((value, {req}) => {
          if(value != req.body.password) {
              throw new Error("As senhas não são iguais.")
          }
          return true;
      })
  ]
}

const admLoginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail válido ."),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({min: 5})
      .withMessage("A senha é obrigatória.")
  ]
}

const admUpdateValidation = () => {
  return [
    body("name")
    .isString()
    .withMessage("")
    .isLength({min: 3})
    .withMessage("O nome é obrigatório."),
  body("email")
    .isString()
    .withMessage("O e-mail ée obrigatório.")
    .isEmail()
    .withMessage("Insira um e-mail válido."),
  body("password")
    .isString()
    .withMessage("A senha é obrigatório.")
    .isLength({min: 5})
    .withMessage("A senha é obrigatória.")
  ]
}


module.exports = {
  admCreateValidation,
  admLoginValidation,
  admUpdateValidation
}