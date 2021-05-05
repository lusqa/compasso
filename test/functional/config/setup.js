/* eslint-env node, mocha */
const mongoose = require('mongoose')

const {
  HOST,
  PORT,
  PROTOCOL
} = require('~src/env')

before(async function () {
  global.baseURL = `${PROTOCOL}://${HOST}:${PORT}/api/v1`
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
