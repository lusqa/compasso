const { Router } = require('express')
const controller = require('../controllers/city.controller')
const { city: middlewares } = require('../middlewares')

module.exports = () => {
  const router = Router()

  router.route('/').post(middlewares.create, controller.create)
  router.route('/').get(controller.get)

  return router
}
