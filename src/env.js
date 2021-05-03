if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PROTOCOL: process.env.PROTOCOL || 'http',
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'debug'
}
