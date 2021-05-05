const { Router } = require('express')
const swaggerUi = require('swagger-ui-express')

const city = require('./city.routes')
const client = require('./client.routes')
const swaggerDocument = require('../swagger.json')

module.exports = () => {
  const routes = Router()

  routes.use('/city', city())
  routes.use('/client', client())
  routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  return routes
}
