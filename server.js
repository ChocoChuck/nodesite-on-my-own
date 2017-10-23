const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

// app.use(function (req, res, next) {
//   res.send('The site is undergoing some maintenace')
// });
app.use(function(req, res, next){
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  fs.appendFileSync('server.log', log + '\n');

  var addLog = function(log){
    var logs = [];
    var fetchLogs = fs.readFileSync('serverLog.json');
    var logs = JSON.parse(fetchLogs);
    var aLog = {
        log
      }
      logs.push(alog);
      fs.writeFileSync('server-log.json', JSON.stringify(logs))
  }

  next();
});

hbs.registerHelper('getCurrentYear', function(){
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text){
  return text.toUpperCase();
})

app.get('/', function(req, res){
  //res.send('Hello World');
  res.render('home.hbs', {
    pageTitle: "This is the second time I'm doing this",
    //currentYear: new Date().getFullYear()
  });
});

app.get('/about', function(req, res){
  res.render('about.hbs', {
    pageTitle: "This is the second time I'm doing this"
    //currentYear: new Date().getFullYear()
  });
})

app.get('/projects', function(req, res){
  res.render('projects.hbs');
})

app.listen(port, function(){
  console.log('Server is on port' + port);
});
