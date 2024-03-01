const express = require('express')
const { registerAdm, login, updateAdm, getAdmById, deleteAdm } = require('../controllers/AdmController')
const router = express()

const { buyNumbers, getClients, deleteClient, getClientById, updateClient, deleteAllClients } = require("../controllers/ClientController")
const { admCreateValidation, admLoginValidation, admUpdateValidation } = require('../middlewares/admValidation')
const validate = require('../middlewares/handleValidation')

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
router.delete("/deleteAdm/:id", deleteAdm)

module.exports = router
