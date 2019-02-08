const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/kiosk';
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/kiosk'); //mongodb://127.0.0.1:27017

//const conn = mongoose.createConnection('mongodb://localhost/kiosk');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const req = new Schema({
  id: ObjectId,
  number: String,
  input: String,
  date: Date
});

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  const message = twiml.message();
 console.log("data 1 "+req.body.Body);
  console.log("data 1 "+req.body.From);
  var requestdata = req.body.Body;
  if(requestdata == "Hi"){
	   message.body('Welcome to DBS kiosk Services! 1. Personal Loan. 2. Trade Doc. 3. Investment Banking Data.');
	   //message.body('Welcome to DBS kiosk Services! 1. Personal Loan. 2. Trade Doc. 3. Investment Banking Data.');
	   //message.body('Welcome to DBS kiosk Services! 1. Personal Loan. 2. Trade Doc. 3. Investment Banking Data.');
	   //message.body('Welcome to DBS kiosk Services! 1. Personal Loan. 2. Trade Doc. 3. Investment Banking Data.');
  
  }
  if(requestdata == "1"){
	  message.body('Interest Rates: 10.99% a.Check Eligibility ');
  }
  
  if(requestdata == "a"){
	  message.body('you are eligible');
  }
  
   if(requestdata == "2"){
	  message.body('Trade Documents Aviabale at nearest branch : Nearest locations - kukatpally, ForumMall');
  }
   if(requestdata == "3"){
	  message.body('Our RM will get back to you shortly!')
  }
  

MongoClient.connect(url, function(err, db){
	if(err) throw err;
	var dbo = db.db("kiosk");
	var myobj = {"name":req.body.From,"number":req.body.From}
	
	
	
	dbo.collection("customers").insertOne(myobj, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
	db.close(); });


	dbo.collection("customers").findOne({}, function(err, result) {
		if (err) throw err;
		console.log(result.name);
		db.close();
	  });
});


  /* const Req = mongoose.model('req' , req);
  
  Req.number = 123;
  Req.input='Praveen';
  
  Req.save(function (err) {
  
  }); */
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
