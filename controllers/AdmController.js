const Adm = require("../models/Adm")

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { mongoose } = require('mongoose')

const jwtSecret = "mysecretesorteio"

// Generate user token
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: '10d'
    })
}

// Cadastro manager
const registerAdm = async(req, res) => {

    const { name, email, password } = req.body

    // Check se já e um adm
    const adm = await Adm.findOne({email})

    if(adm) {
        res.status(422).json({
            errors: ['Você já é um administrador.']
        })
        return
    }

    // Gerar password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    // Registrar
    const newAdm = await Adm.create({
        name,
        email, 
        password: passwordHash
    })

    // verificar problemas
    if(!newAdm) {
        res.status(422).json({
            errors: ['Houve um erro, por favor tente mais tarde.']
        })
        return
    }

    res.status(201).json({
        _id: newAdm._id,
        token: generateToken(newAdm._id)
    })

}

// login
const login = async(req, res) => {

    const { email, password } = req.body

    const adm = await Adm.findOne({email})

    if(!adm) {
        res.status(404).json({
            errors: ["E-mail ou senha incorreta"]
        })
        return
    }

    if(!(await bcrypt.compare(password, adm.password))) {
        res.status(422).json({
            errors: ['Senha incorreta.']
        })
        return
    }

    res.status(201).json({
        _id: adm._id,
        token: generateToken(adm._id)
    })
}

const getAdmById = async(req, res) => {
  const { id } = req.params

  const adm = await Adm.findById(id)

  if(!adm) {
    res.status(404).json({
        errors: ['Administrador não encontrado.']
    })
    return
  }

  res.status(200).json(adm)

}

const updateAdm = async(req, res) => {
    const { name, email, password } = req.body

    try {
        const { id } = req.params
        const adm = await Adm.findById(id);

        if (!adm) {
            return res.status(404).json({
                errors: ['Administrador não encontrado.']
            });
        }

        if (name) {
            adm.name = name;
        }

        if (email) {
            adm.email = email;
        }

        if (password) {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            adm.password = passwordHash;
        }

        await adm.save();

        return res.status(200).json({
            adm,
            message: 'Dados atualizados com sucesso.'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: ['Erro interno do servidor.']
        });
    }
} 

const deleteAdm = async(req, res) => {
   const { id } = req.params

   const adm = await Adm.findByIdAndDelete(id)

   res.status(200).json({
       id: adm._id,
       message: "Administrador excluido com sucesso."
   })

}

module.exports = {
    registerAdm,
    login,
    updateAdm,
    getAdmById,
    deleteAdm
}