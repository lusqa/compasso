const services = require('../services/city')

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req
      await services.create(body)
      return res.status(201).json('City created successfully!')
    } catch (error) {
      return res.status(500).send(`Error creating the city: ${error.message}`)
    }
  },
  get: async (req, res) => {
    try {
      const { query } = req
      const city = await services.get(query)

      if (!city.length) {
        return res.status(404).json('No one city found')
      }

      return res.status(200).json(city)
    } catch (error) {
      return res.status(500).send(`Error finding the city: ${error.message}`)
    }
  }
}
