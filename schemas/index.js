const mongoose = require('mongoose')

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true)
  }
  mongoose.connect('mongodb://root:nodejs@localhost:27017/admin', {
    dbName: 'nodejs',
    useNewUrlParser: true,
    useCreateIndex: true
  }, (error) => {
    if (error){
      console.log('connect error', error)
    } else {
      console.log('connect success')
    }
  })
}

mongoose.connection.on('error', (error) => {
  console.error('connect error', error)
})

mongoose.connection.on('disconnected', () => {
  console.error('mongo db disconnected')
  connect()
})

module.exports = connect
