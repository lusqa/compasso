const mongoose = require('mongoose')
const { Mockgoose } = require('mockgoose')

const {
  HOST,
  PORT,
  PROTOCOL,
  NODE_ENV
} = require('~src/env')

const LOGGER = require('~src/logger')([__filename].join())

const connectDatabase = async () => {
  LOGGER.info('Using mockgoose to run tests')
  const mockgoose = new Mockgoose(mongoose)

  LOGGER.info('Preparing mockgoose storage!')
  await mockgoose.prepareStorage()
  LOGGER.info('Mockgoose storage prepared!')

  await mongoose.connect('mongodb://example.com/TestingDB', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  LOGGER.info('Connection to mock database has successfully established!')
}

before(async function () {
  global.baseURL = `${PROTOCOL}://${HOST}:${PORT}/api/v1`

  if (NODE_ENV === 'test') {
    await connectDatabase()
  }
  const createServer = require('../../../server')
  await createServer()
})

afterEach(function (done) {
  if (mongoose.connection.db) {
    mongoose.connection.db.dropDatabase(done)
  } else {
    done()
  }
})
