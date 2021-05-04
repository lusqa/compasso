const { create } = require('../services/city')

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req
      await create(body)
      return res.status(201).json('City created successfully!')
    } catch (error) {
      return res.status(500).send(`Error creating the city: ${error.message}`)
    }
  }
}
