const express = require('express')

const app = express()

const port = 3000
app.listen(port, err => {
  if (err) {
    console.error('Error starting server due to: %s', err)
    throw err
  }

  console.log(`Server listening on port: ${port}`)
})
