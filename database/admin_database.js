var Database = function( _mongoose , _db , _Schema) {
  
	this.db = _db;
	this.Schema = _Schema;
	this.mongoose = _mongoose;
	this.crypto = null;
	this.date = new Date();
	this.error_log = new require('./constant_error_log.js');
	this.schemaList = [];
	this.fs = null;
	this.dir_path = null;
	this.mailServer = null;
	
	this.emailObject = {
		emailSend : 'admin@pdteam.net',
		emailPass : 'chymdada123',
		domainMail : 'smtp.yandex.com'
	};

	this.setDirPath = function(_dir){
		this.dir_path = _dir;
	}
	this.setFsExtra = function(fsExtra){
		this.fs = fsExtra;
	}

	this.setMailServer = function(server){
		this.mailServer = server;
	}

	this.setConstantModel = function(mConstantModel){

	};

	this.addNewModel = function( _schema ){
		this.schemaList.push({name:_schema.getName() , schema: _schema.getSchema()});
		var newmodel = this.mongoose.model(_schema.getName() , _schema.getSchema());
		return newmodel;

	}

	this.getSchemaFromList = function(_schema_name){
		for(var i = 0 ; i < this.schemaList.length ; i++){
			if(this.schemaList[i].name == _schema_name){
				return this.schemaList[i].schema;
			}
		}
	}

	this.getSchemaFromName = function(name_of_model){
		return this.mongoose.model(name_of_model).schema;
	}

	this.getModelFromName = function(name_of_model){

		if(typeof this.mongoose == 'undefined'){
			console.log('dm mongoose');
			return 0;
		}

		return this.mongoose.model(name_of_model);	
	}

	this.setCrypto = function(_crypto){
		this.crypto = _crypto;
	}

	this.generatePassword = function(pass, securityKey){
		return this.crypto.createHash('md5').update(pass+'._' + securityKey).digest('hex');
	};

	this.generateToken = function(){
		var timenow = this.date.getTime();
		var token_random = this.crypto.randomBytes(64).toString('hex');
		return token_random + '-' + timenow;
	}

	this.generateCaptcha = function(_callback){

    	var confirmCode = Math.floor(Math.random() * (9999 - 1111) + 1111);
    	


	};

	this.generateRandomSalt = function(){

    	var salt = Math.floor(Math.random() * (9999 - 1111) + 1111);
    	

    	return salt;
	};

	this.parseParams = function(req){
		var token = req.body.token;
		var data = req.body.data;
		if(typeof token == undefined){
			return;
		}
		return data;
	};

	this.subtract2Day = function(date1, date2){
		
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 )); 
		
		return diffDays;
	}

	this.generateErrorMessage = function(keycode  ){
		return {'errors' : true , 'data' : keycode };
	};

	this.generateMessageToClient = function( _data){
		return {'errors' : false , 'data' : _data};
	}

	this.sendEmailRegisterSuccess = function(_to ){
		this.fs.readFile(this.dir_path + '/email_template/register/register_success.html', 'utf8', function (err,data) {
		  	if (err) {
		    	return console.log(err);
		  	}
		  	console.log(data);
		  	
		  	this.mailServer.send({
		   		text:    "", 
		   		from:    "admin@pdteam.net", 
		   		to:      "tdinhphuoc@gmail.com",
		   		cc:      "",//"else <else@your-email.com>",
		   		subject: "testing emailjs",
		   		attachment: 
	   			[
	      			{data:data, alternative:true},
	      			// {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
	   			]
			}, function(err, message) { console.log(err || message); res.send({success:true}); });
		});
	};

	// this.checkTokenValidWithPermission = function(_token , _arrPermission , _callback){
	// 	this.getModelFromName(mConstantModel.MODEL_USER).populate({
	// 			path: mConstantModel.MODEL_ACCOUNT_LOGIN_DETAIL ,
	// 			match: { value: account_name }
	// 		})
	// 		.populate({
	// 			mConstantModel.MODEL_USER_ROLE,
	// 			match: {}
	// 		})
	// 			.exec(function(err , account){
	// 				if(err){

	// 				}
	// 				if(typeof account == 'undefined'){

	// 				}
	// 			});
	// };

};
module.exports = Database;