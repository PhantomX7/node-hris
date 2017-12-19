const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { upload } = require('./middleware/upload')
const { connection } = require('./middleware/dbconn')
const xlsx = require('xlsx')

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

//employee route

app.get('/employee', (req, res) => {
  res.render('./employee/mainEmployee')
})
app.get('/employee/new', (req, res) => {
  res.render('./employee/statusEmployee')
})
app.get('/employee/new/upload', (req, res) => {
  res.render('./employee/uploadEmployee')
})
app.post('/employee/new/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(422).json({
      error: 'Please Upload a file'
    })
  }
  let workbook
  let toJson = function toJson (workbook) {
    let result = {}
    workbook.SheetNames.forEach(function (sheetName) {
      let roa = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1})
      if (roa.length) result[sheetName] = roa
    })
    return JSON.stringify(result, 2, 2)
  }
  try {
    workbook = xlsx.readFile(req.file.path)

    // await Event.create(newEvent, function (err, newlyCreated) {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     // redirect back to events page
    //     console.log('event created')
    //     req.flash('success', 'you created an event')
    //     res.redirect('/admin/events')
    //   }
    // })
  } catch (err) {
    console.log(err)
    return res.status(422).json({
      error: 'Error'
    })
  }
  return res.status(200).send(toJson(workbook))
})
app.post('/employee', (req, res) => {
  var status = req.body.status
  res.render('./employee/newEmployee', {status: status})
})

//attendance route

app.get('/attendance', (req, res) => {
  res.render('./attendance/mainAttendance')
})

app.get('/attendance/upload', (req, res) => {
  res.render('./attendance/uploadAttendance')
})

app.post('/attendance/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(422).json({
      error: 'Please Upload a file'
    })
  }
  let workbook
  let toJson = function toJson (workbook) {
    let result = {}
    workbook.SheetNames.forEach(function (sheetName) {
      let roa = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1})
      if (roa.length) result[sheetName] = roa
    })
    return JSON.stringify(result, 2, 2)
  }
  try {
    workbook = xlsx.readFile(req.file.path)

  } catch (err) {
    console.log(err)
    return res.status(422).json({
      error: 'Error'
    })
  }
  return res.status(200).send(toJson(workbook))
})

// port config
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
