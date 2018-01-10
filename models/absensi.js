var mongoose   = require('mongoose');

var absensiSchema=new mongoose.Schema({
	date : String,
	NIK: {
		type : String,
		ref : "employee"
			// model yang kita connect
		}
	});

var Absensi= mongoose.model("Absensi",absensiSchema);

module.exports= Absensi;