var mongoose   = require('mongoose');

var employeeSchema=new mongoose.Schema({
	Start_Date_in_Medan : Date,
	NIK : String,
	Last_Name : String,
	First_Name : String,
	DOB_on_KTP : Date,
	Departmet : String,
	jam_masuk : Date,
	atasan_langsung: String,
	absensi : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : "absensi"
		}
	]
});

var Employee= mongoose.model("Employee",employeeSchema);

module.exports= Employee;