//
// API FOR FRONT-END FOR USER
//
var UserPublicApi = function( app , _dir_path , mDatabaseController , mConstantModel , mApiConstant ) {
  	
    app.post(mApiConstant.api_register_user, function(req , res){
    	api_register_user(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });


    app.post(mApiConstant.api_register_pay_plan_seller, function(req , res){
    	api_register_pay_plan_seller(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });

    app.post(mApiConstant.api_register_free_plan_seller, function(req , res){
    	api_register_free_plan_seller(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });
    
    

};

module.exports = UserPublicApi;





function api_register_user(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant){
	
	//{email: '', password:'', roleId: ''}
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;

	if(typeof name == 'undefined' || typeof email == 'undefined' || typeof password == 'undefined'  ){
		res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.not_enough_require_field));
		return;
	}


	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE).findOne({type: 1 } , function(err, role){
		if(err){
			console.log(err);
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
			return;
		};

		if(role == null){
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.not_exist_params_to_query));
			return;
		}

		mDatabaseController.getModelFromName(mConstantModel.MODEL_ACCOUNT_LOGIN_DETAIL)({
			type: 1 , value: email
		}).save(function(err , accountSaved){
			if(err){
				res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
				return;
			}
			var id = accountSaved._id;
			console.log('id = ' + id);
			
			var _salt = 1234;
			_salt = mDatabaseController.generateRandomSalt();
			
			var generated_password = mDatabaseController.generatePassword(password , _salt);
			mDatabaseController.getModelFromName(mConstantModel.MODEL_USER)({
				account:id , password: generated_password , salt:_salt , isActive: 1 , role: role._id , accountContent: accountSaved, email: email,
				roleContent: role
			}).save(function(err, user){
				if(err){
					res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
					console.log('save loi cmnr '+ err.message);
					return;
				}
				accountSaved.fromUser = user._id;
				accountSaved.save();
				res.json(mDatabaseController.generateMessageToClient({ data:  user._id  }));
				mDatabaseController.sendEmailRegisterSuccess(user.email);
			});

		});
	});
};

function api_register_pay_plan_seller(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant){
	
	//{email: '', password:'', roleId: ''}
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;

	if(typeof name == 'undefined' || typeof email == 'undefined' || typeof password == 'undefined'  ){
		res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.not_enough_require_field));
		return;
	}


	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE).findOne({type: 11 } , function(err, role){
		if(err){
			console.log(err);
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
			return;
		};

		if(role == null){
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.not_exist_params_to_query));
			return;
		}

		mDatabaseController.getModelFromName(mConstantModel.MODEL_ACCOUNT_LOGIN_DETAIL)({
			type: 1 , value: email
		}).save(function(err , accountSaved){
			if(err){
				res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
				return;
			}
			var id = accountSaved._id;
			console.log('id = ' + id);
			
			var _salt = 1234;
			_salt = mDatabaseController.generateRandomSalt();
			
			var generated_password = mDatabaseController.generatePassword(password , _salt);
			mDatabaseController.getModelFromName(mConstantModel.MODEL_USER)({
				account:id , password: generated_password , salt:_salt , isActive: 1 , role: role._id , accountContent: accountSaved, email: email,
				roleContent: role
			}).save(function(err, user){
				if(err){
					res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
					console.log('save loi cmnr '+ err.message);
					return;
				}
				accountSaved.fromUser = user._id;
				accountSaved.save();
				res.json(mDatabaseController.generateMessageToClient({ data:  user._id  }));
				mDatabaseController.sendEmailRegisterSuccess(user.email);
			});

		});
	});
};

function api_register_free_plan_seller(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant){
	
	//{email: '', password:'', roleId: ''}
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;

	if(typeof name == 'undefined' || typeof email == 'undefined' || typeof password == 'undefined'  ){
		res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.not_enough_require_field));
		return;
	}


	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE).findOne({type: 10 } , function(err, role){
		if(err){
			console.log(err);
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
			return;
		};

		if(role == null){
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.not_exist_params_to_query));
			return;
		}

		mDatabaseController.getModelFromName(mConstantModel.MODEL_ACCOUNT_LOGIN_DETAIL)({
			type: 1 , value: email
		}).save(function(err , accountSaved){
			if(err){
				res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
				return;
			}
			var id = accountSaved._id;
			console.log('id = ' + id);
			
			var _salt = 1234;
			_salt = mDatabaseController.generateRandomSalt();
			
			var generated_password = mDatabaseController.generatePassword(password , _salt);
			mDatabaseController.getModelFromName(mConstantModel.MODEL_USER)({
				account:id , password: generated_password , salt:_salt , isActive: 1 , role: role._id , accountContent: accountSaved, email: email,
				roleContent: role
			}).save(function(err, user){
				if(err){
					res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
					console.log('save loi cmnr '+ err.message);
					return;
				}
				accountSaved.fromUser = user._id;
				accountSaved.save();
				res.json(mDatabaseController.generateMessageToClient({ data:  user._id  }));
				mDatabaseController.sendEmailRegisterSuccess(user.email);
			});

		});
	});
};