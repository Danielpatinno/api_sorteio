const mongoose = require("mongoose")

const conn = async () => {

    try {
        
        const dbConn = await mongoose.connect(`mongodb+srv://DanielPatino:Y8gTf6e2hmbP6F9p@cluster0.n71nixt.mongodb.net/?retryWrites=true&w=majority`)

        console.log('Conectou ao banco')

    } catch (error) {
        console.log('Erro' + error)
    }

}

conn()

module.exports = conn