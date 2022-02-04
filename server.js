// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// No parameter, return current date and time
app.get("/api/timestamp/", function (req, res) {
  var intDate = Date.now();
  res.json({'unix': intDate, 'utc': new Date(intDate).toUTCString()});
});

// Route to handle parameter: String Date or String Unix Date. Anything else is an invalid Date
app.get("/api/timestamp/:date", (req, res) => {
  var strDate = req.params.date;
  // Check if the parameter is a Date in String format
  if (!isNaN(Date.parse(strDate))) {
    var dateObject = new Date(strDate);
    res.json({ 'unix': dateObject.valueOf(), 'utc': dateObject.toUTCString() });
  } else if (/\d{5,}/.test(strDate)) { // Check if the parameter is a Date as integer in unix format
      var intDate = parseInt(strDate);
      res.json({ 'unix': intDate, 'utc': new Date(intDate).toUTCString() });
  } else { // Anything else is an invalid Date
    res.json({ 'error': "Invalid Date" });
  }

});


// use port 3000 or any defined in environment
var port = process.env.PORT || 3000;

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
