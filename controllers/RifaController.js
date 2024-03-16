const Rifa = require('../models/Rifa')

const registerRifa = async(req, res) => {
    try {
      const rifaImage = req.file.filename

      const existingRifa = await Rifa.findOne();

      if (existingRifa) {
        return res.status(422).json({
          errors: ['Já existe uma rifa cadastrada.']
        });
      }

      const newRifa = await Rifa.create({
        rifaImage
      })

      if(!newRifa) {
        res.status(422).json({
          errors: ['Houve um problema, tente novamente mais tarde.']
        })
      }

      res.status(201).json(newRifa)        

      } catch (error) {
        return res.status(500).json({
          errors: ['Erro interno do servidor.']
      });
    }
}

const getRifa = async(req, res) => {
  try {
    const rifa = await Rifa.findOne();

    if (!rifa) {
        return res.status(404).json({
            errors: ['Nenhuma rifa encontrada.']
        });
    }

    return res.status(200).json(rifa);
} catch (error) {
    return res.status(500).json({
        errors: ['Erro interno do servidor.']
    });
}
}

const deleteImageRifa = async(req, res) => {

    try {
    
        await Rifa.deleteMany({})
     
        res.status(200).json({
         message: 'Imagem excluida'
        })
     
       } catch (error) {
         res.status(500).json({
             message: 'Ocorreu um erro ao tentar deletar a imagem.',
             error: error.message
         })
       }

}

module.exports = {
    registerRifa,
    getRifa,
    deleteImageRifa
}
