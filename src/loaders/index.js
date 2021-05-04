const expressLoader = require('./express.loader')

module.exports = async ({ app }) => {
  await expressLoader({ app })

  console.debug('Express Loader has initalized successfully!')
}
