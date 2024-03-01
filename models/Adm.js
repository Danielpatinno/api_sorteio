const mongoose = require('mongoose')
const { Schema } = mongoose

const AdmSchema = new Schema(
    {
        name: String,
        email: String,
        password: String
    },
    {
        timestamps: true
    }
)

const Adm = mongoose.model('Adm', AdmSchema)

module.exports = Adm