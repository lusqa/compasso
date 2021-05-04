const { Router } = require('express')
const controller = require('../controllers/city.controller')

module.exports = () => {
  const router = Router()

  router.route('/').post(controller.create)

  return router
}
