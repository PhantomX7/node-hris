const express = require('express')
const router = express.Router()
const xlsx = require('xlsx')
const { upload } = require('../middleware/upload')
const db = require('../models');
const moment = require('moment');

// attendance route

router.get('/attendances', async(req, res) => {
  let from=req.query.from
  let to=req.query.to
  console.log("from "+from);
  console.log("to "+to);


  if (from && to) {
    res.json(await showData(from,to))
  }else{
    res.json({});
  }
})

async function showData(from,to){
  let days=Math.abs(moment(from,'YYYY-MM-DD').diff(moment(to,'YYYY-MM-DD'), 'days'))+1;
  let fromDate=moment(from,'YYYY-MM-DD');
  let dataPromise=[]
  for(let i=0;i<days;i++){
    let fromString=fromDate.year()+"-"+(fromDate.month()+1)+"-"+fromDate.date()
    dataPromise.push(loadResultFromDatabase(fromString))
    fromDate.add(1, 'days')
  }
  let results = await Promise.all(dataPromise);
  return results
}

function loadResultFromDatabase(date){
  return db.Employee.aggregate([
      {
         $lookup:
           {
             "from": "attendances",
             "localField": "nik",
             "foreignField": "nik",
             "as": "data_absensi"
           }
      },
      {
        $project: {
          startDate : 1,
          nik : 1,
          first_Name : 1,
          birthday : 1,
          department : 1,
          jam_masuk : 1,
          atasan_langsung : 1,
          absensi: {
            $filter: {
               input: "$data_absensi",
               as: "absensi",
               cond: { $and:[ {$gte: [ "$$absensi.date", new Date(date) ]} ,{$lt: [ "$$absensi.date", moment(date,'YYYY-MM-DD').add(1, 'days').toDate() ]}]}
            }
          }
        }
      },
      {
        $match: {
              "absensi":{ $elemMatch:{$ne: null}}
          }
      }
  ])
}

module.exports = router
