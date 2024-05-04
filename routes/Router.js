const express = require('express')
const router = express()

const {
  registerAdm,
  login,
  updateAdm,
  getAdmById,
  deleteAdm,
  getAdm
} = require('../controllers/AdmController')

const {
  buyNumbers,
  getClients,
  deleteClient,
  getClientById,
  updateClient,
  deleteAllClients
} = require("../controllers/ClientController")

const {
  admCreateValidation,
  admLoginValidation,
  admUpdateValidation
} = require('../middlewares/admValidation')

const validate = require('../middlewares/handleValidation')

// Clients
router.post('/create', buyNumbers)
router.get('/clients', getClients)
router.delete('/delete/:id', deleteClient)
router.get('/clientDetails/:id', getClientById)
router.put('/clientUpdate/:id', updateClient)
router.delete('/deleteClients', deleteAllClients)

// Adm
router.post('/registerAdm',admCreateValidation(), validate, registerAdm)
router.post('/loginAdm', admLoginValidation(), validate, login)
router.put('/updateAdm/:id', admUpdateValidation(), validate, updateAdm)
router.get("/adm/:id", getAdmById)
router.get('/adms', getAdm)
router.delete("/deleteAdm/:id", deleteAdm)


module.exports = router
