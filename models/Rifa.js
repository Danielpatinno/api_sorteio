const mongoose = require('mongoose')
const { Schema } = mongoose

const rifaSchema = new Schema(
    {
        rifaImage: String
    },
    {
        timeStamps: true
    }
)

const Rifa = mongoose.model("Rifa", rifaSchema)

module.exports = Rifa;
