const { validationResult } = require("express-validator");

const validate = (req, res, next) => {

    const errors = validationResult(req)

    // Aqui verifica se o errors está vazio
    if(errors.isEmpty()){
        return next()
    }

    // Se tiver algum erro, irá adicionar no array
    const extractedErros = [];

    // Aqui vamos comverter a variavel errors para um array, e cada erro que tiver, irá ser adicionada na constante errors

    errors.array().map((err) => extractedErros.push(err.msg))

    // Aqui retornamos um erro 422 com os erros

    return res.status(422).json({
        errors: extractedErros
    })
}

module.exports = validate;