const mongoose = require("mongoose")
const { Schema } = mongoose

const sorteioSchema = new Schema(
    {
        numberArray: Number,
    }
)

const Sorteio = mongoose.model("Sorteio", sorteioSchema)

module.exports = Sorteio;