const express = require('express')

const { PORT } = require('./src/env')
const loaders = require('./src/loaders')

const startServer = async () => {
  const app = express()

  await loaders({ app })

  app.listen(PORT, err => {
    if (err) {
      console.error('Error starting server due to: %s', err)
      throw err
    }

    console.info(`Server listening on port: ${PORT}`)
  })
}

module.exports = startServer
