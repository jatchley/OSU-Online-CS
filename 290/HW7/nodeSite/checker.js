var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5750);

/********** **********/
/********** **********/
/********** **********/
/* 
URL FOR TESTING THIS CODE: 
	
*/
/********** **********/
/********** **********/
/********** **********/

// Parses all the data out of the request and returns an object with the parsed URL and Body data
function ParseData (request) {
	// Parse URL
	var urlParams = [];
	for (var param in request.query){
		var value = request.query[param];
		urlParams.push({'name':param, 'value':value})
	}
	
	// Parse body
	var bodyParams = [];
	for (var param in request.body){
		var value = request.body[param];
		bodyParams.push({'name':param, 'value':value})
	}
	
	var parsedData = {};
	parsedData.urlData = urlParams;
	parsedData.bodyData = bodyParams;
	
	return parsedData;
}

app.get('/',function(req,res){	
	var context = ParseData(req);
	context.requestType = "GET";
	res.render('home', context);
});

app.post('/', function(req,res){
	var context = ParseData(req);
	context.requestType = "POST";
	res.render('home', context);
});

app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});