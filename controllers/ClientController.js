const Client = require("../models/Client")

// Compra de número
const buyNumbers = async(req, res) => {
    const { name, phone, numbers } = req.body;

    // Verificar se numéro está disponivel

    const newClient = await Client.create({
        name,phone,numbers
    })

    if(!newClient) {
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde."]})
        return;
    }

    res.status(201).json({
        _id: newClient._id,
        newClient
    })

}

// Ver clientes
const getClients = async(req, res) => {

    const Clients = await Client.find()

    res.status(200).json({
        totalClients: Clients.length,
        clients: Clients
    })
    
}

// Deletar todos os clientes
const deleteAllClients = async(req, res) => {

  try {
    
   await Client.deleteMany({})

   res.status(200).json({
    message: 'Todos os clientes foram deletados com sucesso.'
   })

  } catch (error) {
    res.status(500).json({
        message: 'Ocorreu um erro ao tentar deletar todos os clientes.',
        error: error.message
    })
  }

}

// Deletar cliente
const deleteClient = async(req, res) => {

    const { id } = req.params

    const client = await Client.findByIdAndDelete(id)

    res.status(200).json({
        id: client._id,
        message: "Cliente excluido com sucesso."
    })
}

const getClientById = async (req, res) => {

    const { id } = req.params

    const client = await Client.findById(id)

    if(!client) {
        res.status(404).json({
            errors: ['Cliente não encontrado.']
        })
    }
      
    res.status(200).json(client)
}

const updateClient = async(req, res) => {
  const { id } = req.params
  
  const { numbers } = req.body

  const client = await Client.findById(id)

  if(!client) {
    res.status(404).json({
        errors: ['Cliente não encontrado.']
    })
    return
  }

  if(numbers) {
    client.numbers = numbers
  }

  await client.save()

  res.status(200).json({
    client,
    message: "Dados atualizado com sucesso."
  })

}

module.exports = {
    buyNumbers, 
    getClients,
    deleteClient,
    getClientById,
    updateClient,
    deleteAllClients
}
