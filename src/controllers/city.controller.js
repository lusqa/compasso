const City = require('../models/City')
const services = require('../services/city')

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req
      await services.create(City, body)
      return res.status(201).json({ message: 'City created successfully!' })
    } catch (error) {
      return res.status(500).send({ message: `Error creating the city: ${error.message}` })
    }
  },
  get: async (req, res) => {
    try {
      const { query } = req
      const city = await services.get(City, query)

      if (!city.length) {
        return res.status(404).json({ message: 'No one city found' })
      }

      return res.status(200).json(city)
    } catch (error) {
      return res.status(500).send({ message: `Error finding the city: ${error.message}` })
    }
  }
}
