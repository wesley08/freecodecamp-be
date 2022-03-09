var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
});


// app.get('/now', function(req, res, next) {
//   req.time =new Date().toString();  // Hypothetical synchronous operation
//   next();
// }, function(req, res) {
//   res.json({time:req.time});
// });

// app.use("/public", express.static(__dirname + "/public"));
// app.get('/',(req, res) => {
// 		  res.sendFile(process.cwd() + '/views/index.html');
//     });


// app.get('/json',(req, res) => {
//   if(process.env.MESSAGE_STYLE === "uppercase") return res.json({"message": "HELLO JSON"});
//   return res.json({"message": "Hello json"});
//     });

// app.get('/:word/echo',  function(req, res) {
//   res.json({echo:req.params.word});
// });

// app.get('/name',  function(req, res) {
//   const {first,last}= req.query;
//   res.json( { name: `${first} ${last}`});
// });

// app.post('/name',  function(req, res) {
//   const {first,last}= req.body;
//   res.json( { name: `${first} ${last}`});
// });

app.get('/api/:date*?',  function(req, res) {
  const {date} = req.params;
  const parseDate =  isNaN(date) ? date :parseInt(date);
  const newDate = date ? new Date(parseDate) : new Date();
  const utc = newDate.toUTCString();
  const unix =  new Date(newDate).valueOf();
  if(!isNaN(unix))
    return res.json({unix,utc});
  return res.json({ error : "Invalid Date" });
});

 module.exports = app;
