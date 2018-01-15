var mongoose = require('mongoose')

var attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    unique: true
  },
  nik: {
    type: String,
    ref: 'Employee'
			// model yang kita connect
  }
})

var Attendance = mongoose.model('Attendance', attendanceSchema)

module.exports = Attendance
