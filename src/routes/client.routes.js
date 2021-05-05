const { Router } = require('express')
const controller = require('../controllers/client.controller')
const { client: middlewares } = require('../middlewares')

module.exports = () => {
  const router = Router()

  router.route('/').post(middlewares.create, controller.create)

  return router
}
