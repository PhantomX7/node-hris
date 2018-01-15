const express = require('express')
const router = express.Router()
const xlsx = require('xlsx')
const { upload } = require('../middleware/upload')
const db = require('../models');
const moment = require('moment');

// attendance route

router.get('/attendances', (req, res) => {
  let from=req.query.from
  let to=req.query.to
  console.log("from"+from);
  console.log("to"+to);
  if (from && to) {
    db.Employee.aggregate([
        {
           $lookup:
             {
               "from": "Attendance",
               "localField": "nik",
               "foreignField": "nik",
               "as": "data_absensi"
             }
        },
        {
            $project: {
                "startDate" : 1,
                "nik" : 1,
                "first_Name" : 1,
                "birthday" : 1,
                "department" : 1,
                "jam_masuk" : 1,
                "atasan_langsung" : 1,
             absensi: {
                $filter: {
                   input: "$data_absensi",
                   as: "absensi",
                   cond: { $and:[ {$gte: [ "$$absensi.date", new Date(from) ]} ,{$lt: [ "$$absensi.date", new Date(to) ]}]}
                }
             }
          }

        }
    ])
    .then(function(attendances){
      res.json(attendances)
    })
  }else{
    res.json({});
  }
})



module.exports = router
