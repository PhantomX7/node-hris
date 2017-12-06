const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

// apply middleware
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.redirect('/login')
})
app.get('/dashboard', (req, res) => {
  res.render('dashboard')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.post('/login', (req, res) => {
  res.redirect('/dashboard')
})
app.get('/employee', (req, res) => {
  res.render('./employee/statusEmployee')
})
app.post('/employee', (req, res) => {
  var status = req.body.status
  res.render('./employee/inputEmployee', {status: status})
})

// port config
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
