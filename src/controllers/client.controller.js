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
  },
  get: async (req, res) => {
    try {
      const { query } = req
      const client = await services.get(Client, query)

      if (!client.length) {
        return res.status(404).json({ message: 'No one client found' })
      }

      return res.status(200).json(client)
    } catch (error) {
      return res.status(500).send({ message: `Error finding the client: ${error.message}` })
    }
  },
  delete: async (req, res) => {
    try {
      const { params } = req
      await services.deleteClient(Client, params)
      return res.sendStatus(204)
    } catch (error) {
      return res.status(500).send({ message: `Error deleting the client: ${error.message}` })
    }
  }
}
