const mongoose = require('mongoose')

const LOGGER = require('../logger')([__filename].join())
const { DATABASE_URL } = require('../env')

const databaseLoader = async () => {
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  }

  try {
    await mongoose.connect(DATABASE_URL, options)
    LOGGER.info('Connection to database engine has successfully established')
  } catch (err) {
    LOGGER.error('Something went wrong connecting to the database!')
    throw err
  }
}

module.exports = databaseLoader
