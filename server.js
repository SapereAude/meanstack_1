var express = require("express");
var stylus = require("stylus");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//middleware config for stylus
function compile(str, path) {
	return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views'); //location where express can access template files. res.render uses this path implicitly when called.
app.set('view engine', 'jade');//sets the templating engine for the template files. If not specified, then you should use extensions when accessing a template e.g. 'index.jade' instead of just 'index'
app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		compile: compile
	}
));

app.use(express.static(__dirname + '/public'));
/*(above)serves static content for the app from the "public"
* dir in the application dir. Makes any content in
* the public dir available. (e.g. the scripts.jade
* is responsible for including the scripts files,
* this express.static method makes it available
* for fetching.*/

mongoose.connect('mongodb://localhost/meanstackdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
	console.log('meanstack db opened');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
//Message.findOne({}, function(err, messageDoc){
//	mongoMessage = messageDoc.message;
//	//console.log(messageDoc.message);
//});

Message.findOne().exec(function(err, messageDoc){
	mongoMessage = messageDoc.message;
	//console.log(messageDoc.message);
});


app.get('/partials/:partialPath', function (req, res) {
	res.render('partials/' + req.params.partialPath);
});

app.get('*', function (req, res) {
	res.render('index', {
		mongoMessage: mongoMessage
	});
});

var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');