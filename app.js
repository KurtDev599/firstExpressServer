const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const multer = require('multer')
const { sequelize } = require('./models')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'))
// app.use('/', express.static(__dirname, 'public'))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // true: qs, false: queryString
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true
  },
}))

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공')
  })
  .catch((err) => {
    console.log(err)
  })

app.use('/', indexRouter)
app.use('/user', userRouter)

// app.use((req, res, next) => {
//   console.log('all router')
//   next()
// }, (req, res, next) => {
//   console.log('2all router')
//   next()
// }, (req, res ,next) => {
//   try {
//     // throw new Error('new Error')
//   } catch (error) {
//     next(error)
//   }
// })


app.get('/cookie', (req, res, next) => {
  // req.cookies
  const days = 1;
  res.cookie('name', 'kim', {
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    httpOnly: true,
    path: '/cookie'
  })
  next()
  // res.send('cookie')
  // res.clearCookie('name', encodeURIComponent(name), {
  //   httpOnly: true,
  //   path: 'cookie'
  // })
})

app.get('/session', (req, res, next) => {
  req.session.id = 'asd'
  res.send('session')
  next()
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


app.use((err, req, res, next) => {
  console.error(err)
  res.send('err!!')
})

app.use((req, res, next) =>{
  res.send('404!!')
})

app.listen(app.get('port'), () => {
  console.log('express')
})
