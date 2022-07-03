const express = require('express')
const path = require('path')
const app = express()

app.use((req, res, next) => {
  console.log('all router')
  next()
})

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/static/index.html'))
})

app.get('/about', (req, res) => {
  res.send('hello express')
})

app.get('/category/:name', (req, res) => {
  res.send(`hello ${req.params.name}`)
})

app.get('*', (req, res) => {
  res.send('all request')
})

app.post('/', (req, res) => {
  res.send('post express')
})

app.listen(app.get('port'), () => {
  console.log('express')
})
