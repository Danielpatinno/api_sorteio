const Sorteio = require("../models/Sorteio")


const gravarArrayNumber = async(req, res) => {
    const { numberArray } = req.body;

    // Verificar se já existe um número na base de dados
    let sorteio = await Sorteio.findOne();

    if (sorteio) {
        // Se já existe, atualize-o
        sorteio.numberArray = numberArray;
        await sorteio.save();
        res.status(200).json({
            numberArray: sorteio.numberArray
        });
    } else {
        // Caso contrário, crie um novo
        sorteio = await Sorteio.create({ numberArray });

        if (!sorteio) {
            res.status(422).json({ errors: ["Houve um erro, por favor tente mais tarde."] });
            return;
        }

        res.status(201).json({
            numberArray: sorteio.numberArray
        });
    }
}

const getArrayNumber = async(req, res) => {
    // Obter o primeiro número encontrado na base de dados
    const sorteio = await Sorteio.findOne();

    if (!sorteio) {
        res.status(404).json({ message: "Nenhum número encontrado." });
        return;
    }

    res.status(200).json({
        numberArray: sorteio.numberArray
    });
}

const updateArrayNumber = async(req, res) => {
    const { numberArray } = req.body;

    try {
        // Encontrar o número existente na base de dados
        let sorteio = await Sorteio.findOne();

        // Se não houver número na base de dados, retorne um erro 404
        if (!sorteio) {
            return res.status(404).json({ message: "Nenhum número encontrado." });
        }

        // Atualizar o número com o novo valor
        sorteio.numberArray = numberArray;
        await sorteio.save();

        // Retornar o número atualizado
        return res.status(200).json({
            numberArray: sorteio.numberArray,
            message: "Número atualizado."
        });
    } catch (error) {
        // Se houver algum erro durante o processo de atualização, retorne um erro 500
        console.error("Erro ao atualizar o número:", error);
        return res.status(500).json({ error: "Houve um erro ao atualizar o número." });
    }
}

 
module.exports = {
  gravarArrayNumber,
  getArrayNumber,
  updateArrayNumber
}