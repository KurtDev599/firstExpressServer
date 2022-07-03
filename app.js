const express = require('express')
const path = require('path')
const app = express()

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/static/index.html'))
})

app.get('/about', (req, res) => {
  res.send('hello express')
})

app.post('/', (req, res) => {
  res.send('post express')
})

app.listen(app.get('port'), () => {
  console.log('express')
})
