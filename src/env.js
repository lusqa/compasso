const LOGGER = require('./logger')([__filename].join())

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

if (process.env.NODE_ENV === 'test') {
  LOGGER.info('ENV: %s', process.env)
  process.env.DATABASE_URL = process.env.DATABASE_URL_TEST
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PROTOCOL: process.env.PROTOCOL || 'http',
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/seqtdb',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'debug'
}
