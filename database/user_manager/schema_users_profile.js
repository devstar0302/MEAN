var SchemaUserProfile = function( _mDatabaseController , _constant_value_model_key) {
  
	
	this.mDatabaseController = _mDatabaseController;
	this.constant_value_model_key = _constant_value_model_key;
	
	this.getSchema = function(){


		var Schema = _mDatabaseController.Schema;


		var _schema = new Schema({
			avatar: _mDatabaseController.getSchemaFromList(_constant_value_model_key.MODEL_USER_AVATAR),
			firstName: String , 
			middleName: String,
			lastName: String,
			
		});
		return _schema;
	};

	this.getName = function(){
		return _constant_value_model_key.MODEL_USER_PROFILE;
	};

	

};

module.exports = SchemaUserProfile;