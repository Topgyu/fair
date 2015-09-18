var express = require('express');
var http = require('http');
var fs = require('fs');
var yaml = require('js-yaml');
var nodemailer = require('nodemailer');
var app = express();
var server = http.createServer(app);

configData = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
console.log(configData);

//var EditableGrid = require('editablegrid');

app.set('views', __dirname + '/views');
app.use('/scripts', express.static(__dirname + "/scripts"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('index.html');
});

app.get('/menu', function (req, res) {
	res.render('menu.html');
});
app.get('/serverstatus', function (req, res) {
	res.render('serverstatus.html');
});

app.get('/serverstatus.json', function (req, res) {
	req.accepts('application/json');
	res.render('serverstatus_json.html');
});

var old_result = [];
app.get('/uploadserverstatus', function (req, res) {
	var result = [];
	var break_list = [];
	for (var key in req.query) {
		if (parseInt(req.query[key]) != 0) {
			result.push(key);
		}
	}
	result = result.sort();
	console.log("cur_result:" + result);
	var o_i = 0;
	for(var i = 0; i < result.length; i++) {
		if(o_i < old_result.length && old_result[o_i] == result[i]) {
			o_i++;
		}
		else {
			break_list.push(result[i]);
		}
	}
	// console.log(break_list);
	if(break_list.length > 0) {
		var mailText =
			'Condor server\n'+
			result.join(', ') +
			'\nis currently shut down.';
		var transporter = nodemailer.createTransport({
			service: configData.mail.service,
			auth: {
				user: configData.mail.user,
				pass: configData.mail.password
			}
		});

		var mailOption = {
			from: 'AIPR Email Service <emailservice@ai.kaist.ac.kr>', // sender address
			to: 'jphong@ai.kaist.ac.kr, jmlee@ai.kaist.ac.kr', // list of receivers
			subject: '[Condor Monitor] Condor server is down', // Subject line
			text: mailText, // plaintext body
		};
		console.log(mailOption);
		transporter.sendMail(mailOption, function(err, info) {
			if(err) {
				return console.log(err);
			}
			console.log('Message sent: ' + info.response);
		});
	}
	old_result = result;

	fs.writeFile("views/serverstatus_json.html", JSON.stringify(req.query), function(err){});
	res.end("asdf", 200);
});

server.listen(80, function() {
	console.log('Server is running...');
});