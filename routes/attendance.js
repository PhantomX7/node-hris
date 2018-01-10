const express = require('express')
const router = express.Router()
const xlsx = require('xlsx')
const { upload } = require('../middleware/upload')

// attendance route

router.get('/', (req, res) => {
  res.render('./attendance/mainAttendance')
})

router.get('/upload', (req, res) => {
  res.render('./attendance/uploadAttendance')
})

router.post('/upload', upload.single('file'), async (req, res) => {
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

module.exports = router
