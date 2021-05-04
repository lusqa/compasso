const { Router } = require('express')

const city = require('./city.routes')

module.exports = () => {
  const routes = Router()

  routes.use('/city', city())

  return routes
}
