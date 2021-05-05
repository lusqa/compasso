const { exec } = require('child_process')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

if (process.env.NODE_ENV === 'test') {
  console.log({
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_URL_TEST: process.env.DATABASE_URL_TEST
  })
  exec('echo $DATABASE_URL_TEST', {}, function (error, stdout, stderr) {
    console.log({ stdout, stderr, error })
  })
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
