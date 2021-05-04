const databaseLoader = require('./database.loader')
const expressLoader = require('./express.loader')

module.exports = async ({ app }) => {
  await databaseLoader()

  await expressLoader({ app })

  console.debug('Express Loader has initalized successfully!')
}
