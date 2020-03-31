var SchemaUser = function( _mDatabaseController , _constant_value_model_key) {
  
	
	this.mDatabaseController = _mDatabaseController;
	this.constant_value_model_key = _constant_value_model_key;
	
	this.getSchema = function(){


		var Schema = _mDatabaseController.Schema;


		var _schema = new Schema({
			email: String,
			registerDate: { type: Date, default: Date.now },
			isActive: Number ,
			password: String ,
			salt: Number , // a random number to private password ( not only md5)
			tokenResetPassword: Number,
			name: String , 
			role: { type: Schema.Types.ObjectId, ref: _constant_value_model_key.MODEL_USER_ROLE } , 
			roleContent:_mDatabaseController.getSchemaFromList(_constant_value_model_key.MODEL_USER_ROLE) ,
			account: [{ type: Schema.Types.ObjectId, ref: _constant_value_model_key.MODEL_ACCOUNT_LOGIN_DETAIL }], 
			accountContent: [_mDatabaseController.getSchemaFromList(_constant_value_model_key.MODEL_ACCOUNT_LOGIN_DETAIL)],
			oldPassword: [{ type: Schema.Types.ObjectId, ref: _constant_value_model_key.MODEL_OLD_PASSWORD }], 
			defaultToken: String
		});
		return _schema;
	};

	this.getName = function(){
		return _constant_value_model_key.MODEL_USER;
	};

	

};

module.exports = SchemaUser;