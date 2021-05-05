const { body } = require('express-validator')

const verifyIfCityExists = require('./verify-if-city-not-exists.middleware')
const validationResult = require('../validation-result.middleware')

module.exports = [
  body('name', 'Name is a mandatory field!').isString().exists({ checkNull: true }),
  body('state', 'State is a mandatory field!').isString().exists({ checkNull: true }),
  validationResult,
  verifyIfCityExists
]
