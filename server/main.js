var express = require('express');
var http = require('http')
var app = express()
var server = http.createServer(app);
var EditableGrid = require('editablegrid')

app.set('views', __dirname + '/views');
app.use('/scripts', express.static(__dirname + "/scripts"))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('index.html');
});

app.get('/menu', function (req, res) {
	res.render('menu.html');
});

server.listen(80, function() {
	console.log('Server is running...');
})
