const mongoose = require('mongoose')

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
    console.log('Connection to database engine has successfully established')
  } catch (err) {
    console.error('Something went wrong connecting to the database!')
    throw err
  }
}

module.exports = databaseLoader
