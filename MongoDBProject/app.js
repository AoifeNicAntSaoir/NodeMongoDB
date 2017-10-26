var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/exampleDb");
var nameSchema = new mongoose.Schema({
	passportNo: String,
    firstName: String,
    lastName: String,
	nationality: String,
	dateOfBirth: Date, 
	placeOfBirth: String,
	//dateOfIssue: Date,
	//dateOfExpirty: Date,
	flightNo: String,
	depAirport: String,
	arrAirport: String,
	//depTimeDate: Date,
	//arrTimeDate: Date, 
	seatNo: String,
	baggage: Number,
	fare: Number
});

var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});