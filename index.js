var app = require('express')();
var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var multer = require('multer');
var Promise = require('bluebird');
var schedule = require('node-schedule');
var crypto = require('crypto');
var email = require('emailjs');
var clients = [];
var current_id = 0;


var fs = Promise.promisifyAll(require('fs-extra'));

var emailSend = 'admin@pdteam.net';
var emailPass = 'chymdada123';
var domainMail = 'smtp.yandex.com';

var server 	= email.server.connect({
   	user:    emailSend, 
   	password:emailPass, 
   	host:    domainMail, 
   	ssl:     true
});



//
// MANAGER REQUEST
//
app.use(bodyParser.urlencoded({extended : true }));
app.use(bodyParser.json()); // for parsing application/json


var apiRoutes = express.Router(); 



// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  	// check header or url parameters or post parameters for token
  	var token = req.body.token || req.query.token || req.headers['authorization'];
  	var language = req.body.token || req.query.token || req.headers['language'];
  	if(typeof language == 'undefined'){
  		language = 'en';
  	}

  	// decode token
  	if (token) {
  		
    	next();

  	} else {

    	// if there is no token
    	// return an error
	    return res.status(403).json({ 
	        error: false, 
	        data: 'No token provided.' 
	    });
    
  	}
});

app.use('/api', apiRoutes);

app.get('/c8879d8235d1.html' , function(req, res) {
	res.sendfile(__dirname + '/c8879d8235d1.html'); // load the single view file (angular will handle the page changes on the front-end)
});

require('./controller/public.js')(app,express , __dirname);

//
// MANAGER UPLOAD
//
var upload = multer({ dest: 'uploads/tmp' });


app.get('/test_send_mail' , function(req , res){
	  server.send({
   		text:    "i hope this works", 
   		from:    "admin@pdteam.net", 
   		to:      "tdinhphuoc@gmail.com",
   		cc:      "",//"else <else@your-email.com>",
   		subject: "testing emailjs"
	  }, function(err, message) { console.log(err || message); });
});

app.get('/privateprocy' , function(req, res) {
  res.sendfile(__dirname + '/facebook_invite/privateprocy.html'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('/fb_scan_translate' , function(req, res) {
  res.sendfile(__dirname + '/facebook_invite/scanandtranslate.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/create_dir', function (req, res) {
	const dir = __dirname + '/uploads/store/1';
	fs.ensureDir(dir, err => {
  		console.log(err) // => null
  		// dir has now been created, including the directory it is to be placed in
	})
});

app.post('/profile', upload.single('avatar'), function (req, res, next) {

  	// req.file is the `avatar` file
  	// req.body will hold the text fields, if there were any
  	if(typeof req.file == 'undefined'){
  		console.log('deo co truong nay');
  		return;
  	}else{
  		var fileNameAfterSave = req.file.filename;
  		var filePath = req.file.path;
  		console.log(req.file);
  		console.log(filePath)
  		console.log(fileNameAfterSave);
  		fs.move(filePath, __dirname+'/uploads/store/' + fileNameAfterSave, err => {
  			if (err) return console.error(err)

  			console.log('success!')
		});
  		// { 
  		// 	fieldname: 'avatar',
  		// 	originalname: 'Screenshot_2017-02-23-15-55-20 (1).png',
  		// 	encoding: '7bit',
  		// 	mimetype: 'image/png',
  		// 	destination: 'uploads/',
  		// 	filename: '68603f5415e114631e64a58c5ec6b9da',
  		// 	path: 'uploads\\68603f5415e114631e64a58c5ec6b9da',
  		// 	size: 210403 }
  	}

  	

});


app.get('/run_svn_update', function(req, res){
	runOtherProject(__dirname + "/update_svn.bat");
});


io.on('connection', function(socket){
	console.log('connection');

});


/**
 * CONNECT DATABASE AND SETTING
 *
 * @type       {Function}
 */
var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/vendor_1k4');
var db = mongoose.connection;
var Schema = mongoose.Schema;

Promise.promisifyAll(mongoose); // key part - promisification
                                // 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	console.log("mongoose connected");
	initDatabase();
	
});




//
// init database
//
var DatabaseController = require('./database/admin_database.js');
var mDatabaseController = new DatabaseController(mongoose ,db ,  Schema);

// setting for value
mDatabaseController.setCrypto(crypto);
mDatabaseController.setFsExtra(fs);
mDatabaseController.setDirPath(__dirname);
mDatabaseController.setMailServer(server);

var mConstantModel = new require('./database/constant_model_app.js');

//
// INIT OBJECT
//
function initDatabase(){
	require('./database/function_init_database.js')( mDatabaseController , mConstantModel );
	require('./database/function_init_test_unit.js')( mDatabaseController , mConstantModel );	
}


//
// MANAGER SCREEN FLOW
//
var SiteMap = require('./controller/site_api.js');
var mSiteMap = new SiteMap(app , __dirname , mDatabaseController , mConstantModel);






http.listen(80, function(){
    console.log('listening on *:80');
});


var message_check_license = schedule.scheduleJob({hour: 17, minute: 30}, function(){
  	console.log('Time for ask user active license!');
  	schedulingSendEmail();
});


//
// SCHEDULE TIME TO SCAN LICENSE
//
function schedulingSendEmail(){
	//: {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}
	var key_result = 'scheduling_gift_notice';
	
	console.log('<=============schedulingGiftNotice=====================>');
	
}


//
// Run other project (python / golang)
//
function runOtherProject(path_file){
	require('child_process').exec(path_file, function (err, stdout, stderr) {
	    if (err) {
	        // Ooops.
	        // console.log(stderr);
	        res.end('tach roi do '+ err.message);
	        return console.log(err);
	    }

	    // Done.
	    console.log(stdout);
	    res.end('ok roi do ' + stdout);
	});
}