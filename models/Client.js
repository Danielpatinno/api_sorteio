const mongoose = require("mongoose")
const { Schema } = mongoose

const clientSchema = new Schema(
    {
        name: String,
        phone: String,
        numbers: Array,
    },
    {
        timestamps: true
    }
)

const Client = mongoose.model("Client", clientSchema)

module.exports = Client;
