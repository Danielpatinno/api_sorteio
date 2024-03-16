const { body } = require('express-validator')

const insertRifaValidation = () => {
    return [
        body("rifaImage")
            .custom((value, {req}) => {
                if(!req.file) {
                    throw new Error("A imagem é obrigatória.")
                }
                return true;
            }),
    ]
}

module.exports = { insertRifaValidation }