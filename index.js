const express = require('express')
const path = require("path");
const cors = require("cors")

const app = express()

const PORT = process.env.PORT || 3000

// config JSON and form data respose
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// config cors
app.use(cors({credentials:true, origin:"https://app-sorteio4.netlify.app"}))
// http://localhost:5173
// "https://app-sorteio4.netlify.app"

// uploads
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// rotas
const router = require("./routes/Router")
app.use(router)

// DB CONECT
require("./config/db.js")

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`)
})
