const express = require('express')
const cors = require("cors")

const app = express()

const PORT = process.env.PORT || 3000

// config JSON and form data respose
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// config cors
const whiteList = ["https://app-sorteio4.netlify.app", 'http://localhost:5173']

const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions))

// app.use(cors({credentials:true, origin:"https://app-sorteio4.netlify.app"}))

// rotas
const router = require("./routes/Router")
app.use(router)

// DB CONECT
require("./config/db.js")

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`)
})
