const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://localhost:27017/exampleDb', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('flightDetails').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {flightDetails: result})
  })
})

app.post('/flightDetails', (req, res) => {
  db.collection('flightDetails').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/flightDetails', (req, res) => {
  db.collection('flightDetails')
  .findOneAndUpdate({passportNo: 'Yoda'}, {
    $set: {
      passportNo: req.body.passportNo
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/flightDetails', (req, res) => {
  db.collection('flightDetails').findOneAndDelete({passportNo: req.body.passportNo}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('A customers flight details were deleted')
  })
})