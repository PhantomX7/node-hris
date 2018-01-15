var mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/hrd')

mongoose.Promise = Promise
module.exports.Employee = require('./employee')
module.exports.Absensi = require('./attendance')
