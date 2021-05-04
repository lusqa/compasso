const { body } = require('express-validator')

const verifyIfCityExists = require('./verify-if-city-exists.middleware')
const validationResult = require('../../validation-result.middleware')

module.exports = [
  body('name', 'Name is a mandatory field!').exists({ checkNull: true }),
  body('state', 'State is a mandatory field!').exists({ checkNull: true }),
  validationResult,
  verifyIfCityExists
]
