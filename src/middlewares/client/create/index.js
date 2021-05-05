const { body } = require('express-validator')

const validationResult = require('../../validation-result.middleware')

module.exports = [
  body('name')
    .isString().withMessage('Name should be a string')
    .exists({ checkNull: true }).withMessage('Sex is a mandatory field!'),
  body('sex')
    .isString().withMessage('Sex should be a string')
    .isIn(['M', 'F']).withMessage('Sex should be \'M\' or \'F\'!')
    .exists({ checkNull: true }).withMessage('Sex is a mandatory field!'),
  body('birthDate')
    .isDate().withMessage('Sex should be a date')
    .exists({ checkNull: true }).withMessage('birthDate is a mandatory field!'),
  body('age')
    .isInt().withMessage('Sex should be a integer')
    .exists({ checkNull: true }).withMessage('age is a mandatory field!'),
  body('city')
    .isString().withMessage('City name should be a string')
    .exists({ checkNull: true }).withMessage('City name is a mandatory field!'),
  validationResult
]
