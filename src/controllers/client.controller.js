const Client = require('../models/client')
const City = require('../models/city')
const services = require('../services/client')

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req
      await services.create(Client, City, body)
      return res.status(201).json({ message: 'Client created successfully!' })
    } catch (error) {
      return res.status(500).send({ message: `Error creating the client: ${error.message}` })
    }
  }
}
